import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles/index';
import Drawer from '@material-ui/core/Drawer/index';
import Divider from '@material-ui/core/Divider/index';
import Typography from '@material-ui/core/Typography/index';
import IconButton from '@material-ui/core/IconButton/index';
import { Close } from '@material-ui/icons/index';

import { toggleDrawer } from '../../../store/actions/NavActions';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 250,
    [theme.breakpoints.up('sm')]: {
      width: 350,
    },
  },

  fullList: {
    width: 'auto',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  farRightToggleButton: {
    position: 'absolute',
    right: 2,
  },
}));

const HelpDrawer = ({ open, toggleDrawer }) => {
  const classes = useStyles();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer}
      classes={{
        paper: classes.drawer,
      }}
    >
      <div className={classes.toolbar}>
        <Typography variant="h6" component="h2">
          AirBnb Gotit Help
        </Typography>
        <IconButton onClick={toggleDrawer} className={classes.farRightToggleButton}>
          <Close />
        </IconButton>
      </div>

      <Divider component={'hr'} />
      <div
        tabIndex={0}
        role="button"
        onClick={toggleDrawer}
        className={classes.content}
        onKeyDown={toggleDrawer}
      >
        Content goes here
      </div>
    </Drawer>
  );
};

const mapStateToProps = (state) => ({
  open: state.NavReducer.drawerOpen,
});

const mapDispatchToProps = {
  toggleDrawer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpDrawer);
