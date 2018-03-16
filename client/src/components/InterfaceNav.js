import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Donations from './Donation';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import '../styles/Nav.css';
import {Link} from 'react-router-dom';


export default class InterfaceNav extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            open: false
        }
    }

    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();
    
        this.setState({
          open: true,
          anchorEl: event.currentTarget,
        });
      };
    
      handleRequestClose = () => {
        this.setState({
          open: false,
        });
      };

    render(){
        return(
            <nav className='my-interface-nav'
           
            >
            <Link to='/dashboard'>
            <h1 style={{
                color: 'white',
                float: 'left',
                marginLeft: 40
            }}
            >TRAX</h1>
            </Link>
            <div className='interface-nav-action-container'>
            <RaisedButton
                label="Manage My Employees"
                onClick={this.props.handleToggle}
            />
            <Donations />
            </div>
                <div className='interface-nav-drop-container'>
                <RaisedButton
                    style={{minWidth: 60}}
                    onClick={this.handleClick}
                    icon={<ExpandMore />}
                />
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'middle', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'right', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                >
                    <Menu className="interface-nav-drop-menu">
                        <MenuItem >
                        <FlatButton
                            label="Manage My Employees"
                            onClick={()=>{
                                this.setState({open: false});
                                this.props.handleToggle();
                            }}
                        />
                        </MenuItem>
                        <MenuItem>
                            <Donations 
                                flat={true}
                                handleClose={this.handleRequestClose}
                            />
                        </MenuItem>
                                    
                    </Menu>
                </Popover>
                </div>
            
            </nav>
        )
    }


}