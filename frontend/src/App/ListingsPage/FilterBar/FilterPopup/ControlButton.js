import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const ControlButton = ({ handleClear, handleApply, isShowClear }) => {
  return (
    <Grid container justify="space-between">
      <Grid item>
        {isShowClear && (
          <Button onClick={handleClear}>
            <Box fontWeight={600}>Clear</Box>
          </Button>
        )}
      </Grid>
      <Grid item>
        <Button color="primary" onClick={handleApply}>
          <Box fontWeight={600}>Apply</Box>
        </Button>
      </Grid>
    </Grid>
  );
};

ControlButton.propTypes = {
  handleApply: PropTypes.func.isRequired,
  handleClear: PropTypes.func.isRequired,
};

export default ControlButton;
