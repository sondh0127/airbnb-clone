const homepageState = {
  places: [],
  destinations: [],
  isLoading: false,
  isFooterVisible: false,
  isError: false,
};

export const homeReducer = (state = homepageState, action) => {
  switch (action.type) {
    case 'FETCH_PLACES_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_PLACES_ERROR':
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case 'FETCH_PLACES_SUCCESS':
      return {
        ...state,
        places: [...state.places, ...action.places],
        isLoading: false,
      };
    case 'TOGGLE_SHOW_FOOTER':
      return {
        ...state,
        isFooterVisible: !state.isFooterVisible,
      };
    case 'FETCH_DESTINATIONS_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'FETCH_DESTINATIONS_ERROR':
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    case 'FECTH_DESTINATIONS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        destinations: [...state.destinations, ...action.destinations],
      };
    default:
      return state;
  }
};
