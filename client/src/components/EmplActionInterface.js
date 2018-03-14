import React from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import MultiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import _ from 'lodash';
import AppBar from 'material-ui/AppBar';
import SearchIcon from 'material-ui/svg-icons/action/search'


//import io from 'socket.io-client';
//import {SocketProvider} from 'socket.io-react';

import {MyMap} from './MyMap';
import {DestinationSearch} from './DestinationSearch';
import {getEmployees} from '../dux/reducer';
import {AppBarDrop} from './AppBarDrop';
import MessageWindow from './MessageWindow';
import RouterForm from './RouterForm';
import RoutesHistory from './RoutesHistory';
import InterfaceNav from './InterfaceNav';


class EmplActionInterface extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          open: false,
          isMarkerShown: true,
          z: 0
        }
        this.handleToggle = this.handleToggle.bind(this)
        this.handleZ = this.handleZ.bind(this)
      }
      componentDidMount(){
        this.props.getEmployees();
        this.delayedShowMarker();
      }

      delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
          }, 2000)
      }

      handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
      }

      handleToggle(){
        this.setState({open: !this.state.open})
      }
  
      handleClose(){
        this.setState({open: false})
      }

      handleZ(){
          if(this.state.z === -2){
            this.setState({z: 0})
          } else {
            this.setState({ z: -2})
          }
        }
      

      

      render() {
        const myEmployees = this.props.employees.map((curr, i)=>{
          return <MenuItem style={{color: 'black'}} key={i}><Link className ='myLinks' to={`/emplInterface/${curr.phone}/${curr.latitude}/${curr.longitude}`}>{curr.name}</Link></MenuItem>
        })
        const selectedEmployee = _.filter(this.props.employees, {phone: this.props.match.params.phone})
          return (
            <div>
              <InterfaceNav handleToggle={this.handleToggle} />
              
                          
            { (selectedEmployee[0]) ?
            <div style={{marginTop: 40,
                        marginBottom: 10,
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        alignItems: 'center'}} 
            >
              <div>
              <MyMap
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                    lat={selectedEmployee[0].latitude}
                    lng={selectedEmployee[0].longitude}
                />
                <MessageWindow  handleZ={this.handleZ} userNameToDisplay={selectedEmployee[0].name} phone={selectedEmployee[0].phone} />
               </div>
               <div>
              <div style={{ width: 290,display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
               <SearchIcon color='black'/>
               <DestinationSearch />
               </div>
               <RouterForm z={this.state.z}
               employeePhone={selectedEmployee[0].phone}
                startingLat={selectedEmployee[0].latitude}
                startingLon={selectedEmployee[0].longitude}
                name={selectedEmployee[0].name}
              />
            </div>
            </div>
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
          
          
          
          {(selectedEmployee[0]) ? 
          <div style={{display: 'flex',flexDirection: 'column',justifyContent:'center',alignItems:'center'}}>
            <h3>{`${selectedEmployee[0].name}'s Routes`}</h3>
            <RoutesHistory 
            employeephone={selectedEmployee[0].phone}
            z={this.state.z}
            />
            </div>
            :
            false
          }
          

          </div>
          );
        }

}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps,{getEmployees})(EmplActionInterface));