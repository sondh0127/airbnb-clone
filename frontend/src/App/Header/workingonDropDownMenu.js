import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  downCarrotButton: {
    padding: 0,
    marginRight: 15,
  },
  menubuttons: {
    fontWeight: 600,
  },
  DropDownMenuRoot: {},
});

const ITEM_HEIGHT = 48;

const WorkingonDropDownMenu = ({ toggleLoginSignupModal, user, toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.DropDownMenuRoot}>
      <IconButton
        aria-label="More"
        aria-owns={open ? 'long-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.downCarrotButton}
      >
        <KeyboardArrowDown />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        <MenuItem className={classes.menubuttons} onClick={toggleDrawer} color="inherit">
          Help
        </MenuItem>
        {user === null && (
          <div>
            <MenuItem
              className={classes.menubuttons}
              onClick={toggleLoginSignupModal}
              color="inherit"
            >
              Sign Up
            </MenuItem>
            <MenuItem
              className={classes.menubuttons}
              onClick={toggleLoginSignupModal}
              color="inherit"
            >
              Log in
            </MenuItem>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default WorkingonDropDownMenu;
