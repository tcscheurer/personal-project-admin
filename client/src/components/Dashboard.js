import React from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import swal from 'sweetalert2';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import '../styles/Dashboard.css';

import {getUser,getEmployees} from '../dux/reducer';
import {AppBarDrop} from './AppBarDrop';
import {LandingMap} from './LandingMap';
import InterfaceNav from './InterfaceNav';
import DashPie from './DashPie';
import DashTable from './DashTable';

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

    handleAlert(){
      swal({
        type: 'info',
        title: `Welcome, ${this.props.user.name}`,
        text: `Group Code: ${this.props.user.authid}`,
        footer: 'Manage your employees!'
      })
    }

    
    render() {
      console.log(this.props.user);
      const myEmployees = this.props.employees.map((curr, i)=>{
        return <MenuItem style={{color: 'black'}} key={i}><Link className ='myLinks' to={`/emplInterface/${curr.phone}/${curr.latitude}/${curr.longitude}`}>{curr.name}</Link></MenuItem>
      })
     
        return (
          <div >
            <InterfaceNav handleToggle={this.handleToggle} />
            {(this.props.user) ? 
            <h3>{`Hi ${this.props.user.name}, welcome to your dashboard.`}</h3>
              : 
            false
            }

            {(this.props.employees[0] && this.props.user) ?
            <div style={{width: '100%', marginBottom: 20, display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap'}}>
            <LandingMap style ={{
              marginTop: 100
            }}
            lat={this.props.employees[0].latitude}
            lng={this.props.employees[0].longitude}
            employees={this.props.employees}
            isMarkerShown={this.state.isMarkerShown}
            />
            <div>
            <h3> Routes completed by Employee </h3>
            <DashPie />
            </div>            
            </div>
            
            :
            false           
            }
           <div>
            <DashTable />
            <RaisedButton  
            icon={<AssignmentIcon />}
            style={{position: 'fixed', right: 10, bottom: 10,height: 40}}
            onClick={()=>this.handleAlert()}
            />
            </div>
       
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