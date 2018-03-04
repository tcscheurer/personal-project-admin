import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

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
            <RaisedButton
                label="Manage My Employees"
                onClick={this.props.handleToggle}
                style={{
                  margin: 20,
                  marginRight: 40,
                  float: 'right'
                }}
                />
            </nav>
        )
    }


}