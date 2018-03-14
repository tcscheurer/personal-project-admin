import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import swal from 'sweetalert2';
import RaisedButton from 'material-ui/RaisedButton';
import CardIcon from 'material-ui/svg-icons/action/credit-card';

class Donations extends Component{

    constructor(){
        super();
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

    render(){
        
        return (
            <StripeCheckout
            name = "TRAX"
            description = "$5 Donation"
            amount = {500}
            token = {token => this.handleToken(token)}
            stripeKey='pk_test_y1r2W9byRCQt5sB6Gj10VKt0'
         >
            <RaisedButton  
                style={{width: 60}}
                icon={<CardIcon />}
            />
            
         </StripeCheckout>
        )
    }
}

export default Donations;