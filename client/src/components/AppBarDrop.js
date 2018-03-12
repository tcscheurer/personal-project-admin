import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import {Link} from 'react-router-dom';
import swal from 'sweetalert2';

function myAlerter (){
  swal({
    title: 'Are your sure?',
    type: 'warning',
    text: 'You are about to sign out of the application, would you like to continue?',
    showCloseButton: false,
    showCancelButton: true,
    confirmButtonText: '<a style={{color: {`white`}}} href="/api/logout"><h3>Yes, sign me out</h3></a>',
    cancelButtonText: '<h3>No, keep me logged in'
  })
}

export const AppBarDrop = (props) => (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton><ExpandMore color='white' /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
    <Link to='/dashboard'><MenuItem primaryText="Dashboard"></MenuItem></Link>
    <MenuItem primaryText="Sign out" onClick={()=>myAlerter()}></MenuItem>
    </IconMenu>
  );