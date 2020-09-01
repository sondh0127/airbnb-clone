import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { DayPickerRangeController } from 'react-dates';
import ControlButton from './ControlButton';
import moment from 'moment';
import {
  DispatchContext,
  FiltersContext,
} from '../../../../store/context/filtersContext';

const useStyles = makeStyles((theme) => ({
  popover: {
    maxWidth: '95%',
  },
  FilterPopup: {
    margin: '0 0px',
    minHeight: 20,
  },
  rightPaper: {
    top: '13.6% !important',
    // right: '1%',
    maxWidth: '50%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '95%',
      right: '0%',
      top: '10%',
    },
  },
  backDropStyling: {
    backgroundColor: '#ffffff94',
  },
  cardcontent: {
    padding: 24,
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
  },
  active: {
    margin: '0 0px',
    minHeight: 20,
    padding: '4px 10px',
    backgroundColor: theme.palette.primary.light,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  inactive: {
    margin: '0 0px',
    minHeight: 20,
    padding: '4px 10px',
  },
}));
const DatesFilter = ({ formikProps }) => {
  const classes = useStyles();
  const [focusedInput, setFocusedInput] = useState('startDate');
  const [state, setState] = useState({
    anchorEl: null,
    startDate: formikProps.values.checkIn,
    endDate: formikProps.values.checkOut,
    buttonActive: formikProps.values.checkIn && formikProps.values.checkOut,
  });

  useEffect(() => {
    setState({
      startDate: formikProps.values.checkIn,
      endDate: formikProps.values.checkOut,
      buttonActive: formikProps.values.checkIn && formikProps.values.checkOut,
    });
    return () => {};
  }, [formikProps.values]);

  const { buttonActive, anchorEl, endDate, startDate } = state;
  const open = Boolean(anchorEl);
  const isSubmmitAble = startDate && endDate;

  const onDatesChange = ({ startDate, endDate }) => {
    setState({ ...state, startDate, endDate });
  };

  const onFocusChange = (focusedInput) => {
    setFocusedInput(focusedInput);
  };

  const handleClick = (event) => {
    setState({
      ...state,
      anchorEl: event.currentTarget,
      buttonActive: true,
    });
  };

  const handleClose = () => {
    const { handleSubmit, setFieldValue } = formikProps;
    let autoEndDate = endDate ? moment(endDate) : null;
    let buttonActive = startDate && endDate;
    if (startDate && !endDate) {
      autoEndDate = moment(startDate).add(1, 'days');
      setFieldValue('checkOut', autoEndDate, false);
    } else {
      setFieldValue('checkIn', startDate, false);
      setFieldValue('checkOut', endDate, false);
    }

    setState({
      ...state,
      anchorEl: null,
      endDate: autoEndDate,
      buttonActive,
    });
    handleSubmit();
  };

  const handleClearDate = () => {
    setState({
      ...state,
      startDate: null,
      endDate: null,
      buttonActive: !state.buttonActive,
    });
    setFocusedInput('startDate');
  };

  let buttonTitle = startDate ? moment(startDate).format('MMM D') : `Dates`;
  buttonTitle = endDate
    ? buttonTitle.concat(`-${moment(endDate).format('MMM D')}`)
    : buttonTitle;

  const isDayBlocked = (day) => day < moment().subtract(1, 'day');

  return (
    <div className={classes.FilterPopup}>
      <Button
        className={buttonActive || isSubmmitAble ? classes.active : classes.inactive}
        onClick={handleClick}
        variant="outlined"
      >
        {buttonTitle}
      </Button>
      <Popover
        id="dates-popper"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        className={classes.popover}
        PaperProps={{ classes: { root: classes.rightPaper } }}
        BackdropProps={{
          classes: {
            root: classes.backDropStyling,
          },
        }}
      >
        <Card className={classes.card}>
          <CardContent className={classes.cardcontent}>
            <DayPickerRangeController
              startDate={startDate}
              endDate={endDate}
              minimumNights={1}
              focusedInput={focusedInput}
              onDatesChange={onDatesChange}
              onFocusChange={onFocusChange}
              noBorder
              hideKeyboardShortcutsPanel
              numberOfMonths={2}
              isDayBlocked={(day) => isDayBlocked(day)}
            />
            <ControlButton
              handleApply={handleClose}
              handleClear={handleClearDate}
              isShowClear={startDate || endDate}
            />
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
};

export default DatesFilter;
