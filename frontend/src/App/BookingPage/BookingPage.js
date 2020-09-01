import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { S } from './styled';
import BookingItem from './BookingItem';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { fetchUserBookings, deleteBooking } from '../../store/actions/BookingActions';
import moment from 'moment';
import StyledLink from '../../shared/StyledLink';

const BookingPage = ({ bookings, deleteBooking, fetchUserBookings }) => {
  useEffect(() => {
    fetchUserBookings();
  }, []);

  const bookingLists = (list) =>
    console.log('list', list) || (
      <Grid container justify="center" alignItems="center" spacing={1}>
        {list &&
          list.length > 0 &&
          list.map((item, index) => (
            <Grid item key={index}>
              <BookingItem booking={item} deleteBooking={deleteBooking} />
            </Grid>
          ))}
      </Grid>
    );
  const oldBookings = bookings.filter((el) =>
    moment().isAfter(moment(el.checkIn), 'day')
  );
  const newBookings = bookings.filter(
    (el) => !moment().isAfter(moment(el.checkIn), 'day')
  );
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={7}>
        <Box p={5}>
          <Grid container justify="space-around" alignItems="center">
            <Grid item>
              <Grid container direction="column" spacing={4}>
                <Box fontSize={40} mb={2}>
                  Choose your next adventure
                </Box>
                <Box fontSize="subtitle1.fontSize" mb={2}>
                  Book a listing and start your dream vacation today
                </Box>
                <Button color="secondary" variant="contained" size="large">
                  <StyledLink to="/listings" color="secondary">
                    View listings
                  </StyledLink>
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <S.DivGift />
            </Grid>
          </Grid>
        </Box>
      </Grid>
      {newBookings && newBookings.length > 0 && (
        <Grid item xs={8}>
          <Box p={1} m={2} textAlign="center">
            <Box fontSize="h4.fontSize" fontWeight="bold">
              Upcoming Bookings
            </Box>
            {bookingLists(newBookings)}
          </Box>
        </Grid>
      )}
      {oldBookings && oldBookings.length > 0 && (
        <Grid item xs={8}>
          <Box p={1} m={2} textAlign="center">
            <Box fontSize="h4.fontSize" fontWeight="bold">
              Past Bookings
            </Box>
            {bookingLists(oldBookings)}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  bookings: state.BookingsReducer.bookings,
});

const mapDispatchToProps = {
  fetchUserBookings,
  deleteBooking,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookingPage);
