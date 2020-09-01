import * as types from '../constants/actionTypes';

const initialState = () => ({
  error: null,
  loading: false,
  listings: [],
  listing: {
    completed: {
      step1: 0,
      step2: 0,
      step3: 0,
    },
    is_publish: false,
    id: null,
    host_id: null,
    room_type: 'entire_place', //required
    num_guests: 4,
    num_bedrooms: 0,
    num_beds: 1,
    sleeping_arrangements: [],
    num_bathrooms: 1,
    country: '', //required
    street: '', // required
    city: '', // required
    state: '',
    zip_code: '',
    center: {
      lat: 0,
      lng: 0,
    },
    amenities: {
      essentials: false,
      wifi: false,
      shampoo: false,
      closet: false,
      tv: false,
      heat: false,
      air_conditioning: false,
      breakfast: false,
      desk: false,
      fireplace: false,
      iron: false,
      hair_dryer: false,
      private_entrance: false,
      smoke_detector: false,
      carbon_monoxide_detector: false,
      first_aid_kit: false,
      fire_extinguisher: false,
    },
    spaces: {
      pool: false,
      kitchen: false,
      washer: false,
      dryer: false,
      parking: false,
      elevator: false,
      hot_tub: false,
      gym: false,
    },
    photos: [],
    summary: '',
    the_space: '',
    the_availability: '',
    neighborhood: '',
    the_getting_around: '',
    listing_title: '',
    house_rules: {
      children: false,
      infants: false,
      pets: false,

      smoking: false,
      events: false,
      addition_rules: [],
    },
    min_nights: 1,
    max_nights: null,
    price: 0,
    calendar: [],
  },
});

export default (state = initialState(), { type, payload }) => {
  switch (type) {
    case types.START_LISTING_LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case types.CLEAR_LISTING_LOADING:
      return {
        ...state,
        error: null,
        loading: false,
      };
    case types.RECEIVE_LISTING_ERRORS:
      return {
        ...state,
        error: payload.error,
        loading: false,
      };
    case types.RECEIVE_LISTINGS:
      return {
        ...state,
        listings: payload.listings,
        loading: false,
      };
    case types.RECEIVE_LISTING:
      return {
        ...state,
        listing: {
          ...state.listing,
          ...payload.listing,
        },
        loading: false,
      };
    case types.RECEIVE_LISTING_SLEEP_ARGMS:
      return {
        ...state,
        listing: {
          ...state.listing,
          sleeping_arrangements: payload.sleeping_arrangements,
        },
      };
    case types.RECEIVE_CALENDAR:
      return {
        ...state,
        listing: {
          ...state.listing,
          calendar: payload.calendar,
        },
      };
    case types.RECEIVE_LISTING_PHOTOS:
      return {
        ...state,
        listing: {
          ...state.listing,
          photos: payload.photos,
        },
      };
    case types.CHANGE_PUBLISH_LISTING:
      return {
        ...state,
        listing: {
          ...state.listing,
          is_publish: payload.is_publish,
        },
        loading: false,
      };
    case types.RESET_LISTING:
      return initialState();
    default:
      return state;
  }
};
