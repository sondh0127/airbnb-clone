import * as types from '../constants/actionTypes';
import axios from '../axios';
import moment from 'moment';
import { receiveReviews } from './ReviewActions';

export const updateBookingDates = (checkIn, checkOut) => ({
  type: types.UPDATE_BOOKING_DATES,
  payload: { checkIn, checkOut },
});

export const updateGuests = (guests, adultsNum, childrenNum, infantsNum) => ({
  type: types.UPDATE_BOOKING_GUESTS,
  payload: { guests, adultsNum, childrenNum, infantsNum },
});

export const updateTotalCost = (totalCost) => ({
  type: types.UPDATE_BOOKING_TOTAL_COST,
  payload: { totalCost },
});

const receiveBookings = (bookings) => ({
  type: types.RECEIVE_BOOKINGS,
  payload: {
    bookings,
  },
});

const receiveBooking = (booking) => ({
  type: types.RECEIVE_BOOKING,
  payload: {
    booking,
  },
});

const receiveErrors = (error) => ({
  type: types.RECEIVE_BOOKING_ERRORS,
  payload: {
    error,
  },
});

export const startLoading = () => ({
  type: types.START_BOOKING_LOADING,
});

export const clearErrors = () => ({
  type: types.CLEAR_BOOKING_ERRORS,
});

export const createBooking = (booking, listingId) => {
  const processedBooking = { ...booking };
  processedBooking.listingId = listingId;
  processedBooking.checkIn = moment(booking.checkIn).format('DD/MM/YYYY');
  processedBooking.checkOut = moment(booking.checkOut).format('DD/MM/YYYY');
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      let res = await axios.post(`/reservations`, processedBooking);
      const { data } = res;
      if (res.status === 202) {
        dispatch(receiveErrors(data.message));
        return null;
      } else {
        dispatch(getBookingOfListing(listingId));
        // return data.id;
      }
    } catch (error) {
      dispatch(receiveErrors(error.message));
    }
  };
};

export const fetchUserBookings = () => {
  const userId = localStorage.getItem('userId');
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      let res = await axios.get(`/reservations/users/${userId}`);
      const { data } = res;
      let bookings = data.items;

      const listingGeneral = bookings.map(async (booking) => {
        const response = await axios.get(`/listings/${booking.listingId}/general`);
        return { ...booking, ...response.data };
      });
      const listingAndReview = await Promise.all(listingGeneral);
      dispatch(receiveBookings(listingAndReview));
    } catch (error) {
      dispatch(receiveErrors(error.message));
    }
  };
};

export const resetBooking = () => ({
  type: types.RESET_BOOKING,
});

export const getBookingOfListing = (listingId) => {
  const userId = localStorage.getItem('userId');
  return async (dispatch) => {
    try {
      if (userId) {
        let res = await axios.get(`/reservations/listings/${listingId}?userId=${userId}`);
        if (res.status !== 204) {
          const { data } = res;
          data.checkIn = moment(data.checkIn);
          data.checkOut = moment(data.checkOut);
          if (moment().isAfter(moment(data.checkOut), 'day')) {
            dispatch(resetBooking());
          } else {
            dispatch(receiveBooking(res.data));
          }
        }
      }
    } catch (error) {
      dispatch(receiveErrors(error.message));
    }
  };
};

// export const updateBooking = (booking) => (dispatch) => {
//   dispatch(startLoading());
//   return bookingAPIUtils
//     .updateBooking(booking)
//     .then(
//       (newBooking) => dispatch(receiveBooking(newBooking)),
//       (errors) => dispatch(receiveErrors(errors.responseJSON))
//     );
// };

export const deleteBooking = (bookingId) => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      let res = await axios.delete(`/reservations/${bookingId}`);
      const data = { res };
      dispatch(fetchUserBookings());
    } catch (e) {
      dispatch(receiveErrors(e.message));
    }
  };
};
