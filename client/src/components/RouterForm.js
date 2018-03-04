import React from 'react';
import TextField from 'material-ui/TextField';
import {cyan300} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import io from 'socket.io-client';

const styles = {
    errorStyle: {
        color: 'black',
      },
    floatingLabelStyle: {
        color: 'black',
      },
    floatingLabelFocusStyle: {
        color: 'black',
      }
  }

class RouterForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            destinationLat: '',
            destinationLon: '' ,
            endpoint: 'http://localhost:5000'
        }
    }


    handleDestinationLat = (e) =>{
        this.setState({
          destinationLat: e.target.value
        })
      }
      handleDestinationLon = (e) =>{
       this.setState({
         destinationLon: e.target.value
       })
     }

     employeeRoutingHandler = ()=>{
         console.log(this.state)
         console.log(this.props)
         const body = {
             employeephone: this.props.employeePhone,
             destlat: this.state.destinationLat,
             destlon: this.state.destinationLon,
             startinglat: this.props.startingLat,
             startinglon: this.props.startingLon
         }
         console.log(body)
         axios.post('/api/routes',body).then(response=>{
             console.log(response)
             const {endpoint} = this.state;
             const socket = io(endpoint);
             socket.emit('RoutesUpdate');

         }).catch(err=>console.log(err))
         
     }

    render(){
        return(
            <div>
            <TextField 
            style={{zIndex: this.props.z}}
            floatingLabelText="Destination Latitude"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            errorText="Latitude to route employee"
            errorStyle={styles.errorStyle}
            onChange={(e)=>this.handleDestinationLat(e)}
            
            /><br/>
            <TextField
            style={{zIndex: this.props.z}}
            floatingLabelText="Destination Longitude"
            floatingLabelStyle={styles.floatingLabelStyle}
            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
            errorText="Longitude to route employee"
            errorStyle={styles.errorStyle}
            onChange={(e)=>this.handleDestinationLon(e)}
            /><br/>
            <FlatButton style={{zIndex: this.props.z}} onClick={()=>{this.employeeRoutingHandler()}} label={`Route ${this.props.name}`} fullWidth={false} />
            </div>
        )
    }
}

export default RouterForm;