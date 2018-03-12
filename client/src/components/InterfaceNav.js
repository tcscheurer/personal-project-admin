import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Donations from './Donation';

export default class InterfaceNav extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <nav style={{
                backgroundColor: 'black',
                height: 75,
                width: '100%',
                marginBottom: 20
            }}
            >
            <h1 style={{
                color: 'white',
                float: 'left',
                marginLeft: 40
            }}
            >TRAX</h1>
            <div 
            style={{width: 400,float: 'right', display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: 20}}>
            <RaisedButton
                label="Manage My Employees"
                onClick={this.props.handleToggle}
                style={{
                  
                }}
                />
            <Donations />
            </div>
            </nav>
        )
    }


}