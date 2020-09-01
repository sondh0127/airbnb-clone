import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { updateBookingDates } from '../../../../store/actions/BookingActions';

const ListingAvailability = ({
  booking,
  calendar,
  minimumNights,
  updateBookingDates,
}) => {
  const [focusedInput, setFocusedInput] = useState('startDate');

  const isDayBlocked = (day) =>
    day < moment().subtract(1, 'day') ||
    calendar.some((date) => moment(date).isSame(day, 'day'));
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <H21xu9tpch>
          <Div1wt9k7hn>
            <span>Availability</span>
          </Div1wt9k7hn>
          {booking.checkIn && (
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="subtitle1">
                  {`${minimumNights} ${
                    minimumNights === 1 ? `night` : `nights`
                  } minimum stay`}
                </Typography>
              </Grid>
              <Grid item style={{ marginRight: 8 }}>
                <Button
                  onClick={() => {
                    updateBookingDates(null, null);
                    setFocusedInput('startDate');
                  }}
                >
                  <Typography color="primary"> Clear dates</Typography>
                </Button>
              </Grid>
            </Grid>
          )}
        </H21xu9tpch>
      </div>
      <DayPickerRangeController
        startDate={booking.checkIn}
        endDate={booking.checkOut}
        onDatesChange={({ startDate, endDate }) => updateBookingDates(startDate, endDate)}
        minimumNights={minimumNights}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => {
          setFocusedInput(focusedInput);
        }}
        numberOfMonths={2}
        noBorder
        hideKeyboardShortcutsPanel
        isDayBlocked={(day) => isDayBlocked(day)}
      />
    </div>
  );
};

const H21xu9tpch = styled.h2`
  color: inherit !important;
  font-size: 1em !important;
  font-weight: inherit !important;
  line-height: inherit !important;
  margin: 0px !important;
  padding: 0px !important;
  display: inline !important;
`;

const Div1wt9k7hn = styled.div`
  color: #484848 !important;
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
`;

const mapStateToProps = (state) => ({
  booking: state.BookingsReducer.booking,
});

const mapDispatchToProps = {
  updateBookingDates,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListingAvailability);
