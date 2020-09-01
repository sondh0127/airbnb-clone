import * as types from '../constants/actionTypes';
const initialState = {
  loading: null,
  error: null,
  booking: {
    id: null,
    checkIn: null,
    checkOut: null,
    guests: 1,
    adultsNum: 1,
    childrenNum: 0,
    infantsNum: 0,
    totalCost: null,
  },
  // user bookings list
  bookings: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.START_BOOKING_LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.RECEIVE_BOOKING_ERRORS:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case types.UPDATE_BOOKING_DATES:
      return {
        ...state,
        error: null,
        booking: {
          ...state.booking,
          checkIn: payload.checkIn,
          checkOut: payload.checkOut,
        },
      };
    case types.UPDATE_BOOKING_GUESTS:
      return {
        error: null,
        ...state,
        booking: {
          ...state.booking,
          guests: payload.guests,
          adultsNum: payload.adultsNum,
          childrenNum: payload.childrenNum,
          infantsNum: payload.infantsNum,
        },
      };
    case types.UPDATE_BOOKING_TOTAL_COST:
      return {
        ...state,
        error: null,
        booking: {
          ...state.booking,
          totalCost: payload.totalCost,
        },
      };
    case types.RECEIVE_BOOKING:
      return { ...state, loading: false, error: false, booking: payload.booking };
    case types.RECEIVE_BOOKINGS:
      return { ...state, error: null, bookings: payload.bookings };
    case types.RESET_BOOKING:
      return { bookings: state.bookings, ...initialState };
    default:
      return state;
  }
};
