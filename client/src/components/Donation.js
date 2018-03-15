import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import swal from 'sweetalert2';
import RaisedButton from 'material-ui/RaisedButton';
import CardIcon from 'material-ui/svg-icons/action/credit-card';
import FlatButton from 'material-ui/FlatButton';

class Donations extends Component{

    constructor(props){
        super(props);
    }

    handleToken(token){
        axios.post('/api/stripe',token).then(response=>{
            console.log(response);
        })
       swal({
           title: 'Thank you!',
           text: "Your donations mean very much to our success.",
           timer: 3000,
            onOpen: () => {
                swal.showLoading()
            }
       })
    }

    onClosed(){
        if(this.props.handleClose){
        this.props.handleClose();
        } else {
            return;
        }
    }

    render(){
        
        return (
            <StripeCheckout
            name = "TRAX"
            description = "$5 Donation"
            amount = {500}
            token = {token => this.handleToken(token)}
            stripeKey='pk_test_y1r2W9byRCQt5sB6Gj10VKt0'
            closed={()=>this.onClosed()}
         >
            {(this.props.flat === true) ? 
            <FlatButton
                style={{width: 60}}
                icon={<CardIcon />}
            />
            :
            <RaisedButton                  
                style={{width: 60}}
                icon={<CardIcon />}
            />
            }
            
         </StripeCheckout>
        )
    }
}

export default Donations;