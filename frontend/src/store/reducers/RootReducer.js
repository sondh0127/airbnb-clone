import { combineReducers } from 'redux';
import { homeReducer } from './homeReducer';
import NavReducer from './NavReducer';
import ListingReducer from './ListingReducer';
import AuthReducer from './AuthReducer';
import ReviewReducer from './ReviewReducer';
import BookingsReducer from './BookingsReducer';
const RootReducer = combineReducers({
  AuthReducer,
  homeReducer,
  NavReducer,
  ListingReducer,
  ReviewReducer,
  BookingsReducer,
});

export default RootReducer;
