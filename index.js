require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const massive = require("massive");
const Auth0Strategy = require('passport-auth0');
const path = require('path');


const port = 5000;

const app = express();
app.use(json());
const{
    CONNECTION_STRING,
    AUTH_DOMAIN,
    AUTH_CLIENT_ID,
    AUTH_CLIENT_SECRET,
    SESSION_SECRET,
} = process.env;
/*
TWILIO_ACC_SID,
TWILIO_ACC_TOKEN,
TWILIO_PHONE_NUM
*/

//const client = require('twilio')(TWILIO_ACC_SID,TWILIO_ACC_TOKEN);
massive(CONNECTION_STRING).then(db=>app.set('db',db)).catch(err=>console.log(err));

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000000
    }
}))

app.use(passport.initialize());
app.use(passport.session());

//Passport strategy
passport.use(new Auth0Strategy({
    domain: AUTH_DOMAIN,
    clientSecret: AUTH_CLIENT_SECRET,
    clientID: AUTH_CLIENT_ID,
    scope: 'openid profile',
    callbackURL: '/auth'
},
(accessToken,refreshToken,extraParams,profile,done)=>{
    
    app.get('db').getUserByAuthId(profile.id).then(response=>{
        if(!response[0]){
            app.get('db').createUserByAuthId([profile.id,profile.displayName]).then(created=>done(null,created[0]))
        } else {
            return done(null, response[0])
        }
        
    })
}))

passport.serializeUser((user,done)=>done(null,user));
passport.deserializeUser((user,done)=>done(null,user));

app.get('/auth',
passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/dashboard',
    failureRedirect: 'http://localhost:3000/'
})
);

require('./routes/routes')(app);
var server = app.listen(port, () => {
    console.log(`Listening on Port: ${port}`);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log('Socket Connection');


    socket.on('MessagesChange',()=>{
        console.log('Socket invoked for emit on server for Messages Change')
        io.sockets.emit('MessagesChange')
    })

    socket.on('RoutesUpdate', ()=>{
        console.log('Socket On server received emit for RoutesUpdate')
        io.sockets.emit('RoutesUpdate')
    })

    socket.on('disconnect', () => {
        console.log('Client socket has disconnected')
    })

  });