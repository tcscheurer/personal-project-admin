import React from 'react';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import {Link} from 'react-router-dom';

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
    <a href='/api/logout'><MenuItem primaryText="Sign out"></MenuItem></a>
    </IconMenu>
  );