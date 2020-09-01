import * as types from '../constants/actionTypes';
const dumpReview = (id) => ({
  id: id,
  ratings: {
    accuracy_rating: 0,
    checkin_rating: 0,
    cleanliness_rating: 0,
    communication_rating: 0,
    value_rating: 0,
    location_rating: 0,
  },
  guest_name: '',
  guest_photo: 'https://s3-us-west-1.amazonaws.com/guestpics/50BgQSS.jpg',
  guest_link: 'https://s3-us-west-1.amazonaws.com/guestpics/50BgQSS.jpg',
  review_date: null,
  reservation_id: null,
  body: '',
  host_id: null,
  host_name: '',
  host_photo: 'https://s3-us-west-1.amazonaws.com/guestpics/277Qo3f.jpg',
  host_text: '',
});

const dumpReviews = Array.from(Array(30)).map((item, index) => dumpReview(index));

const initialState = {
  loading: null,
  error: null,
  reviews: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.RECEIVE_REVIEWS:
      return { ...state, reviews: payload.reviews };
    case types.RECEIVE_REVIEWS_ERRORS:
      return { ...state, loading: null, error: payload.error };
    case types.START_REVIEW_LOADING:
      return { ...state, loading: true, error: null };

    default:
      return state;
  }
};
