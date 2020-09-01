import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: 'var(--height)',
    borderBottomLeftRadius: '2px',
    borderTopLeftRadius: '2px',
    borderBottomRightRadius: '10px',
    borderTopRightRadius: '10px',
    borderLeftWidth: '1px',
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 0px',
  },
  colorPrimary: {
    backgroundColor: '#edefed',
  },
  barColorPrimary: {
    backgroundColor: '#00a699',
  },
  bar1Determinate: {
    borderBottomRightRadius: '10px',
    borderTopRightRadius: '10px',
    transition: 'width 0.4s ease',
  },
});

const DeterminateProgress = ({ completed }) => {
  const classes = useStyles();

  return (
    <LinearProgress
      variant="determinate"
      value={completed}
      style={
        completed === 100
          ? {
              '--height': '5px',
            }
          : {
              '--height': '10px',
            }
      }
      classes={{
        root: classes.root,
        colorPrimary: classes.colorPrimary,
        barColorPrimary: classes.barColorPrimary,
        bar1Determinate: classes.bar1Determinate,
      }}
    />
  );
};

export default DeterminateProgress;
