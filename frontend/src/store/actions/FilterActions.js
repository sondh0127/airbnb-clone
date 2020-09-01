import axios from '../axios';
import { fetchListingsFilter } from './ListingActions';
import * as types from '../constants/actionTypes';

export const updateDateFilter = (startDate, endDate) => ({
  type: types.UPDATE_DATE_FILTER,
  payload: {
    startDate,
    endDate,
  },
});

export const updateGuestFilter = (guests) => ({
  type: types.UPDATE_DATE_FILTER,
  payload: {
    guests,
  },
});

export const updateHomeTypeFilter = (home_type) => ({
  type: types.UPDATE_HOME_TYPE_FILTER,
  payload: {
    home_type,
  },
});

export const updatePriceFilter = (min_price, max_price) => ({
  type: types.UPDATE_HOME_TYPE_FILTER,
  payload: {
    min_price,
    max_price,
  },
});

export const updateFilter = (filter) => ({
  type: types.UPDATE_FILTER,
  filter,
});
