import * as types from '../constants/actionTypes';
import moment from 'moment';

const getSearchFromValues = (values) => {
  const {
    location: vLocation,
    checkIn,
    checkOut,
    guests,
    adultsNum,
    childrenNum,
    infantsNum,
    private_room,
    shared_room,
    entire_place,
    price_range,
  } = values;
  let search = [];

  if (vLocation) {
    if (values && values.location && values.location.coordinates) {
      const { lat, lng } = values.location.coordinates;
      search.push(`lat=${lat}&lng=${lng}`);
    }
  }
  if (checkIn && checkOut) {
    const checkInVal = moment(checkIn).format('DD/MM/YYYY');
    const checkOutVal = moment(checkOut).format('DD/MM/YYYY');

    search.push(`checkIn=${checkInVal}&checkOut=${checkOutVal}`);
  }
  if (guests > 0) {
    search.push(`guests=${guests}`);
  }
  if (childrenNum > 0) {
    search.push(`children=true`);
  }
  if (infantsNum > 0) {
    search.push(`infants=true`);
  }
  if (shared_room) {
    search.push(`shared_room=1`);
  }
  if (private_room) {
    search.push(`private_room=1`);
  }
  if (entire_place) {
    search.push(`entire_place=1`);
  }
  if (price_range) {
    search.push(`price=${price_range[0]}-${price_range[1]}`);
  }
  return search;
};

export default (state, action) => {
  switch (action.type) {
    case types.UPDATE_FILTER:
      const search = getSearchFromValues(action.filter);
      action.history.push(`/listings?${search.join('&')}`);
      return { ...state, ...action.filter };
    default:
      return state;
  }
};
