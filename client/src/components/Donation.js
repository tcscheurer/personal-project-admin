import React, {Component} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Donations extends Component{

    constructor(){
        super();
    }

    handleToken(token){
        axios.post('/api/stripe',token).then(response=>{
            console.log(response);
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
            <button className="donations-btn">
                DONATE
            </button>
         </StripeCheckout>
        )
    }
}

export default Donations;