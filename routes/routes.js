const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const twilClient = require('twilio')(process.env.TWILIO_ACC_SID, process.env.TWILIO_ACC_TOKEN);
const twilPhoneNum = process.env.TWILIO_PHONE_NUM;
module.exports = (app) => {   

// Fuctionality for User/Admin Role

app.get('/api/logout', (req, res) => {
    req.session.destroy(()=>{
      res.redirect('http://localhost:3000/');
    });
});

app.get('/api/user', (req,res)=> {
    if(req.user) {
        res.status(200).send(req.user);
    }
})

app.get('/api/employees',(req,res)=>{
    app.get('db').getMyEmployees(req.user.authid).then(response=>{
        res.status(200).send(response)
    }).catch(err=>console.log(err))
})

app.get('/api/employee',(req,res)=>{
    const {phone} = req.body;
    app.get('db').getEmployee([phone,req.user.authid]).then(response=>{
        res.status(200).send(response)
    }).catch(err=>console.log(err))
})

app.get('/api/messages/:phone',(req,res)=>{
    const phone = req.params.phone;
    app.get('db').getMessages([phone,req.user.authid]).then(response=>{
        res.status(200).send(response)
    }).catch(err=>console.log(err))
})

app.get('/api/messages/employee/:manageid/:phone',(req,res)=>{
    const phone = req.params.phone;
    const manageid = req.params.manageid;
    app.get('db').getMessages([phone,manageid]).then(response=>{
        res.status(200).send(response)
    }).catch(err=>console.log(err))
})

app.delete('/api/message',(req,res)=>{
    const {id} = req.body;
    app.get('db').deleteMessage(id).then(()=>{
        res.status(200).json({message: "Deleted Successfully"})
    }).catch(err=>console.log(err))
})

app.post('/api/message/user',(req,res)=>{
    const {phone,body} = req.body;
    app.get('db').insertMessage(['toEmpl',req.user.authid,phone,body]).then(response=>{
        res.status(200).json({success: "Message successfully saved"})
    }).catch(err=>console.log(err))    
})

app.post('/api/message/employee',(req,res)=>{
    const type = 'toUser';
    const {
        managerauthid,
        phone,
        body
    } = req.body;
    app.get('db').insertMessage([type,managerauthid,phone,body]).then(response=>{
        res.status(200).json({success: "Message successfully saved"})
    })
})

app.get('/api/getAllRoutes',(req,res)=>{
    app.get('db').getAllRoutes(req.user.authid).then(response=>{
        res.status(200).send(response);
    }).catch(err=>console.log(err))
})

app.get('/api/dashRoutes',(req,res)=>{
    app.get('db').getRoutesForDash(req.user.authid).then(response=>{
        res.status(200).send(response)
    }).catch(err=>console.log(err))
})

app.get('/api/routes/:employeephone',(req,res)=>{
    const {employeephone} = req.params;
    app.get('db').getRoutes([employeephone,req.user.authid]).then(response=>{
    if(response[0]){
        res.status(200).send(response)
    } else{
        res.status(200).send([])
    }
    }).catch(err=>console.log(err))
})

app.post('/api/routes',(req,res)=>{
    const {
        employeephone,
        destlat,
        destlon,
        startinglat,
        startinglon,
        description
    } = req.body;
    const data = [
        employeephone,
        req.user.authid,
        startinglat,
        startinglon,
        destlat,
        destlon,
        'incomplete',
        description
    ]
    
    app.get('db').insertRoute(data).then(response=>{
        app.get('db').getEmployee([employeephone, req.user.authid]).then(employee=>{
            twilClient.messages.create({
                to: `+1${employee[0].phone}`,
                from: twilPhoneNum,
                body: `Hi ${employee[0].name}, this is a TRAX notification. You have a new route! Please login to view details`
            }).then(message=>console.log(message.sid)).catch(err=>console.log(err))
        })
        res.status(200).json({success: "Route has been added successsfully"})
    }).catch(err=>console.log(err))
})

app.delete('/api/routes',(req,res)=>{
    const {
        employeephone,
        destlat,
        destlon
    } = req.body;
    const data = [
        req.user.authid,
        employeephone,
        destlat,
        destlon
    ]
    app.get('db').deleteRoute(data).then(response=>{
        res.status(200).json({success: "Route successfully removed"})
    }).catch(err=>console.log(err))
})

app.post('/api/stripe', async (req,res) => {
    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '$5 donation',
        source: req.body.id
    });
    res.status(200).json({ success: "Donation successfully made"})
})

//----------------------------------------------------------------------------------
//  Functionality for Employee Application
//----------------------------------------------------------------------------------

app.post('/api/employee',(req,res)=>{
    const {
        name,
        phone,
        managerauthid,
        latitude,
        longitude
    } = req.body;

    app.get('db').getEmployee([phone,managerauthid]).then(response=>{
        if(!response[0]){
            app.get('db').insertEmployee([phone,name,managerauthid,latitude,longitude])
        } else {
            app.get('db').updateEmployee([latitude,longitude,phone]);
        }
        res.status(200).json({Success: "Success"})
    }).catch(err=>console.log(err))

})

app.get('/api/routes2/:manageid/:phone',(req,res)=>{
    const {
        manageid,
        phone
    } = req.params;
    data = [
        phone,
        manageid
    ]
    console.log(phone,manageid);
    app.get('db').getIncompleteRoutes(data).then(response=>{
        res.status(200).send(response);
    }).catch(err=>console.log(err))
})

app.put('/api/routes/:manageid',(req,res)=>{
    const {manageid} = req.params;
    const{
        phone,
        destlat,
        destlon
    } = req.body;
    const data = [
        manageid,
        phone,
        destlat,
        destlon
    ]
    app.get('db').completeRoute(data).then(response=>{
        res.status(200).json({complete: 'Route has been marked as complete'})
    }).catch(err=>console.log(err))
})

}