import React from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';

import {getUser,getEmployees} from '../dux/reducer';
import {AppBarDrop} from './AppBarDrop';
import {LandingMap} from './LandingMap';
import DashNav from './DashToolbar';

class Dashboard extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        open: false
      }
      this.handleToggle = this.handleToggle.bind(this);
    }
    componentDidMount(){
      this.props.getUser();
      this.props.getEmployees();
    }

    handleToggle(){
      this.setState({open: !this.state.open})
    }

    handleClose(){
      this.setState({open: false})
    }

    
    render() {
      const myEmployees = this.props.employees.map((curr, i)=>{
        return <MenuItem style={{color: 'black'}} key={i}><Link className ='myLinks' to={`/emplInterface/${curr.phone}/${curr.latitude}/${curr.longitude}`}>{curr.name}</Link></MenuItem>
      })
     
        return (
          <div >
            <DashNav handleToggle={this.handleToggle} />
            
            {(this.props.employees[0]) ?
            <LandingMap style ={{
              marginTop: 100
            }}
            lat={this.props.employees[0].latitude}
            lng={this.props.employees[0].longitude}
            employees={this.props.employees}
            isMarkerShown={this.state.isMarkerShown}
            />
            :
            false           
            }
           
              
            
       
            <Drawer
              docked={false}
              width={200}
              open={this.state.open}
              onRequestChange={(open) => this.setState({open})}
              
            >
              <AppBar title="TRAX" 
              style={{
                backgroundColor: 'black'
              }}
              iconElementLeft={ <AppBarDrop />}
              />
              {myEmployees}
            </Drawer>
        
        
          </div>
        );
      }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps,{getUser,getEmployees})(Dashboard));

/*
<h1>{this.props.user.authid}</h1>
<h1>{this.props.user.name}</h1>
<MenuItem onClick={()=>this.handleClose()}>Menu Item</MenuItem>
<MenuItem onClick={()=>this.handleClose()}>Menu Item 2</MenuItem>
*/