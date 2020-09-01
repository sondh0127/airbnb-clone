import * as types from '../constants/actionTypes';
import axios from '../axios';

export const startReviewLoading = () => ({
  type: types.START_REVIEW_LOADING,
});

export const receiveReviews = (reviews) => ({
  type: types.RECEIVE_REVIEWS,
  payload: {
    reviews,
  },
});

export const receiveReviewsErrors = (error) => ({
  type: types.RECEIVE_REVIEWS_ERRORS,
  payload: {
    error,
  },
});

export const createReview = (listing_id, body, ratings, reservation_id) => {
  const userId = localStorage.getItem('userId');
  // check sleeping arrangement == bedrooms
  return async (dispatch) => {
    dispatch(startReviewLoading());
    try {
      let res = await axios.post(`/users/${userId}/reviews`, {
        listing_id,
        reservation_id,
        body,
        ratings,
      });
      const { data } = res;
      if (res.status === 202) {
        dispatch(receiveReviewsErrors(data.message));
        return {
          success: false,
          message: data.message,
        };
      } else {
        dispatch(fetchReviews(listing_id));
      }
      return {
        success: true,
        message: data.id,
      };
    } catch (error) {}
  };
};

export const fetchReviews = (listingId) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`/listings/${listingId}/reviews`);
      const reviews = res.data.items;
      const resReviews = reviews.map((review) => {
        review.guest_name = 'Collette';
        review.guest_photo = 'https://s3-us-west-1.amazonaws.com/guestpics/50BgQSS.jpg';
        review.guest_link = 'https://s3-us-west-1.amazonaws.com/guestpics/50BgQSS.jpg';
        return review;
      });
      dispatch(receiveReviews(resReviews));
    } catch (error) {}
  };
};
