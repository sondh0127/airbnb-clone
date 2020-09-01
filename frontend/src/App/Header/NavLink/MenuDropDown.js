import React, { useState } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton/index';
import MenuItem from '@material-ui/core/MenuItem/index';
import Avatar from '@material-ui/core/Avatar/index';
import Popper from '@material-ui/core/Popper/index';
import Grow from '@material-ui/core/Grow/index';
import Paper from '@material-ui/core/Paper/index';
import ClickAwayListener from '@material-ui/core/ClickAwayListener/index';
import MenuList from '@material-ui/core/MenuList/index';
import { makeStyles } from '@material-ui/core/styles/index';
import { logOutUser } from '../../../store/actions/AuthActions';

const useStyles = makeStyles({
  avatar: {
    width: 30,
    height: 30,
    border: '2px solid #e2e2e2',
  },
});

const DropDownMenu = ({ photoURL, logOutUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        aria-owns={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleMenu}
      >
        {photoURL ? (
          <Avatar alt="user pic" src={photoURL} className={classes.avatar}>
            S
          </Avatar>
        ) : (
          <Avatar alt="user pic" className={classes.avatar}>
            S
          </Avatar>
        )}
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        disablePortal
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={logOutUser}>Logout</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  logOutUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropDownMenu);
