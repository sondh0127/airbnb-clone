import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CostSummary from './CostSummary';
import StarRating from '../ListingDetail/Reviews/StarRating';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { DateRangePicker } from 'react-dates';
import {
  createBooking,
  updateBookingDates,
  updateGuests,
  updateTotalCost,
} from '../../../store/actions/BookingActions';
import moment from 'moment';
import GuestPicker from '../../../shared/GuestPicker';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { handleOpenModal, MODAL_CONTENT } from '../../../store/actions/NavActions';

const OuterDiv = styled.div`
  margin-left: 45px !important;
  width: 376px !important;
  z-index: 3 !important;

  ${(props) =>
    props.isFixed ? 'position: fixed; top: 90px;' : 'position: absolute; top: 24px;'};
`;

const MainDiv = styled.div`
  display: block;
  padding: 24px 24px 24px 24px;
  margin: 16px 0px 24px 0px;
  border: 1px solid #e4e4e4;
  background-color: #ffffff;
  font-size: 14px;
`;

const MarginLine = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #dbdbdb;
`;

const S = {
  SpanNight: styled.span`
    font-size: 12px !important;
    font-weight: 600 !important;
    line-height: 1.33333em !important;
  `,

  DivTextBooking: styled.div`
    font-size: 12px !important;
    font-weight: 600 !important;
    line-height: 1.33333em !important;
    margin-top: 16px;
    margin-bottom: 6px;
  `,
  SpanTotalRating: styled.span`
    margin-left: 4px;
  `,
};

const BookingForm = ({
  listing,
  reviews,
  bookingState,
  authState,
  updateBookingDates,
  updateGuests,
  updateTotalCost,
  createBooking,
  handleOpenModal,
}) => {
  const { loading, error, booking } = bookingState;
  const isBooked = booking.id;
  const [isFixed, setIsFixed] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const costSummaryDisplayed = booking.guests >= 1 && booking.checkIn && booking.checkOut;
  const [state, setState] = useState({
    serviceFeePerc: 0.13,
  });

  const handleScroll = () => {
    let toFixed = window.scrollY > 625;
    if (toFixed !== isFixed) {
      setIsFixed(toFixed);
    }

    const windowHeight =
      'innerHeight' in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1000) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [window.scrollY]);

  const isDayBlocked = (day) =>
    day < moment().subtract(1, 'day') ||
    listing.calendar.some((date) => moment(date).isSame(day, 'day'));

  const handleBooking = () => {
    if (!authState.token) {
      handleOpenModal(MODAL_CONTENT.LOGIN);
    } else if (!booking.checkIn) {
      setFocusedInput('startDate');
    } else if (!booking.checkOut) {
      setFocusedInput('endDate');
    } else if (booking.guests < 1) {
      // TODO
    } else {
      createBooking(booking, listing.id);
    }
  };

  return (
    <OuterDiv isFixed={isFixed} isBottom={isBottom}>
      <MainDiv id="app">
        <div id="summary-header">
          <div id="price-per-night">
            <Typography variant="h6" component={'span'}>
              ${listing.price}
            </Typography>
            <S.SpanNight> per night</S.SpanNight>
          </div>
          <span>
            <StarRating rating={4} small />
            <S.SpanTotalRating>{reviews.length}</S.SpanTotalRating>
          </span>
        </div>
        <MarginLine />
        <S.DivTextBooking>Dates</S.DivTextBooking>
        <DateRangePicker
          onDatesChange={({ startDate, endDate }) =>
            updateBookingDates(startDate, endDate)
          }
          onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
          focusedInput={focusedInput}
          startDateId="splashStartDate"
          endDateId="splashEndDate"
          startDate={booking.checkIn}
          endDate={booking.checkOut}
          showClearDates
          reopenPickerOnClearDates
          numberOfMonths={1}
          startDatePlaceholderText="Check-in"
          endDatePlaceholderText="Checkout"
          minimumNights={listing.min_nights}
          isDayBlocked={(day) => isDayBlocked(day)}
        />
        <S.DivTextBooking>Guests</S.DivTextBooking>
        <GuestPicker
          maxGuests={listing.num_guests}
          guestsValues={booking}
          onSetGuestsCount={(count) =>
            updateGuests(
              count.guests,
              count.adultsNum,
              count.childrenNum,
              count.infantsNum
            )
          }
          hideMaxGuest={false}
        />
        <CostSummary
          display={costSummaryDisplayed}
          startDate={booking.checkIn}
          endDate={booking.checkOut}
          costPerNight={listing.price}
          serviceFeePerc={state.serviceFeePerc}
          guestsSelected={booking.guests}
          updateTotalCost={updateTotalCost}
        />
        <Grid style={{ marginTop: 18 }} justify="center" container direction="column">
          <Grid item style={{ position: 'relative' }}>
            <Button
              color={isBooked ? 'primary' : 'secondary'}
              size="large"
              fullWidth
              disabled={loading}
              variant="contained"
              onClick={isBooked ? null : handleBooking}
            >
              {isBooked ? `Booked` : `Book`}
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                color="secondary"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -12,
                  marginLeft: -12,
                }}
              />
            )}
          </Grid>
          <Grid item style={{ textAlign: 'center' }}>
            {error && (
              <Box fontSize="body2.fontSize" color="error.main" m={1} fontWeight="bold">
                {error}
              </Box>
            )}
            <S.DivTextBooking>You won’t be charged yet</S.DivTextBooking>
          </Grid>
        </Grid>
      </MainDiv>
    </OuterDiv>
  );
};

const mapStateToProps = (state) => ({
  reviews: state.ReviewReducer.reviews,
  bookingState: state.BookingsReducer,
  authState: state.AuthReducer,
});

const mapDispatchToProps = {
  updateBookingDates,
  updateGuests,
  updateTotalCost,
  createBooking,
  handleOpenModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingForm);
