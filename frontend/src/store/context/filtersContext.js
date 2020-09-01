import PropTypes from 'prop-types';
import React, { createContext, useReducer } from 'react';
import filtersReducer from '../reducers/filtersReducer';

const initialTodos = {
  location: null,
  checkIn: null,
  checkOut: null,
  guests: 1,
  adultsNum: 1,
  childrenNum: 0,
  infantsNum: 0,
  // home type
  entire_place: false,
  private_room: false,
  shared_room: false,
  price_range: null,
};
export const FiltersContext = createContext();
export const DispatchContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filtersReducer, initialTodos);
  return (
    <FiltersContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </FiltersContext.Provider>
  );
};

FiltersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
