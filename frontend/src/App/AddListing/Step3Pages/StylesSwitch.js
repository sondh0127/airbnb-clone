import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { fieldToSwitch } from 'formik-material-ui';

const SwitchMui = withStyles((theme) => ({
  root: {
    width: 58,
    height: 32,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(26px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: theme.palette.primary.light,
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 30,
    height: 30,
  },
  track: {
    borderRadius: 32 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
}))(Switch);

const StylesSwitch = (props) => (
  <SwitchMui {...fieldToSwitch(props)} checked={Boolean(props.field.value)} />
);

export default StylesSwitch;
