import axios from '../axios';
import * as types from '../constants/actionTypes';
import moment from 'moment';

const startListingLoading = () => ({
  type: types.START_LISTING_LOADING,
});

const clearListingLoading = () => ({
  type: types.CLEAR_LISTING_LOADING,
});

const receiveListingErrors = () => ({
  type: types.START_LISTING_LOADING,
});

export const receiveListings = (listings) => ({
  type: types.RECEIVE_LISTINGS,
  payload: {
    listings,
  },
});

export const receiveListing = (listing) => {
  const formatedListing = {
    ...listing,
    center: { lat: listing.lat, lng: listing.lng },
  };
  return {
    type: types.RECEIVE_LISTING,
    payload: {
      listing: formatedListing,
    },
  };
};

export const receiveListingSleepArgms = (sleeping_arrangements) => ({
  type: types.RECEIVE_LISTING_SLEEP_ARGMS,
  payload: {
    sleeping_arrangements,
  },
});
export const receiveCalendar = (calendar) => ({
  type: types.RECEIVE_CALENDAR,
  payload: {
    calendar,
  },
});

export const createListing = (listing) => {
  // TODO: RECHECK THIS METHOD
  const userId = localStorage.getItem('userId');
  // check sleeping arrangement == bedrooms
  return async (dispatch) => {
    try {
      let res = await axios.post(`/users/${userId}/listings`, {
        ...listing,
        host_id: userId,
      });
      const { data } = res;
      dispatch(fetchListing(data.id));
      return data.id;
    } catch (error) {}
  };
};

const preProcessingListing = (listing) => {
  let processedListing = { ...listing };

  // check sleeping arrangement == bedrooms
  const num_bedrooms = Number(processedListing.num_bedrooms);
  processedListing = {
    ...processedListing,
    num_bedrooms,
    sleeping_arrangements: processedListing.sleeping_arrangements.slice(
      0,
      num_bedrooms + 1
    ),
    // processing calendar moment
    // only blocked day
    calendar: processedListing.calendar.map((day) => ({
      date_type: 'blocked',
      date: moment(day).format('DD/MM/YYYY'),
    })),
  };

  return processedListing;
};

export const updateListing = (prevlisting) => {
  const userId = localStorage.getItem('userId');
  const listing = preProcessingListing(prevlisting);
  return async (dispatch) => {
    try {
      let res = await axios.put(`/users/${userId}/listings/${listing.id}`, {
        ...listing,
        host_id: userId,
      });

      for (let photo of listing.photos) {
        if (photo.hasOwnProperty('caption')) {
          await axios.put(`/listings/${listing.id}/images`, photo);
        }
      }

      // FIXME IF U CAN
      let resCalendar = await axios.post(`/listings/${listing.id}/dates`, {
        dates: listing.calendar,
      });
      dispatch(receiveListing(res.data));
      dispatch(fetchOtherListingInfo(res.data.id));
    } catch (error) {}
  };
};

export const receivePhotos = (photos) => ({
  type: types.RECEIVE_LISTING_PHOTOS,
  payload: {
    photos,
  },
});

export const removeListingPhoto = (listingID, image) => {
  return async (dispatch) => {
    try {
      let res = await axios.delete(`/listings/${listingID}/images`, {
        data: image,
      });
      if (res.status === 204) {
        return {
          success: true,
          message: 'Success',
        };
      } else {
        return {
          success: true,
          message: 'Something wrong.',
        };
      }
    } catch (error) {
      dispatch(receiveListingErrors(error.message));
    }
  };
};

export const uploadPhoto = (listingID, image) => {
  return async (dispatch) => {
    dispatch(startListingLoading());
    try {
      let res = await axios.post(`/listings/${listingID}/images`, image);
      dispatch(clearListingLoading());
      return res.data.url;
    } catch (error) {
      dispatch(receiveListingErrors(error.message));
    }
  };
};

export const changePublishListing = (is_publish) => ({
  type: types.CHANGE_PUBLISH_LISTING,
  payload: {
    is_publish,
  },
});

export const publishListing = (id, isPublish) => {
  return async (dispatch) => {
    let res = await axios.put(`/listings/${id}/publish`, { is_publish: isPublish });
    dispatch(changePublishListing(isPublish));
  };
};

export const fetchListingsFilter = (search) => {
  return async (dispatch) => {
    let res = await axios.get(`/listings/search${search}`);
    const listings = res.data.items;

    for (let listing of listings) {
      let resPhoto = await axios.get(`/listings/${listing.id}/images`);
      listing.photos = resPhoto.data.items;
      let resReview = await axios.get(`/listings/${listing.id}/reviews`);
      listing.reviews = resReview.data.items;
    }
    dispatch(receiveListings(listings));
  };
};

export const fetchListingByUser = () => {
  const userId = localStorage.getItem('userId');
  return async (dispatch) => {
    let res = await axios.get(`/users/${userId}/listings`);
    const {
      data: { items },
    } = res;
    for (let listing of items) {
      let resPhoto = await axios.get(`/listings/${listing.id}/images`);
      listing.photos = resPhoto.data.items;
    }
    dispatch(receiveListings(items));
  };
};

export const fetchListingSleepArgms = (listingId) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`/listings/${listingId}/sleep_argms`);
      dispatch(receiveListingSleepArgms(res.data.items));
    } catch (error) {}
  };
};

export const fetchCalendar = (listingId) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`/listings/${listingId}/dates`);
      // date to moment
      const calendar = res.data.items.map((item) => moment(item.date, 'DD/MM/YYYY'));
      dispatch(receiveCalendar(calendar));
    } catch (error) {}
  };
};

export const fetchPhoto = (listingId) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`/listings/${listingId}/images`);
      // date to moment
      const photos = res.data.items;
      dispatch(receivePhotos(photos));
    } catch (error) {}
  };
};

export const fetchOtherListingInfo = (listingId) => {
  return (dispatch) => {
    dispatch(fetchListingSleepArgms(listingId));
    dispatch(fetchCalendar(listingId));
    dispatch(fetchPhoto(listingId));
  };
};

export const fetchListing = (listingId) => {
  return async (dispatch) => {
    try {
      let res = await axios.get(`/listings/${listingId}`);
      const { data } = res;
      dispatch(receiveListing(data));
      dispatch(fetchOtherListingInfo(listingId));
      return data.id;
    } catch (error) {
      dispatch(resetListing());
    }
  };
};

export const resetListing = () => ({
  type: types.RESET_LISTING,
});
