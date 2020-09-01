import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles/index';
import InputBase from '@material-ui/core/InputBase/index';

import SearchAutoComplete from '../../../shared/SearchAutoComplete';
import { DispatchContext, FiltersContext } from '../../../store/context/filtersContext';
import { withRouter } from 'react-router-dom';
import * as types from '../../../store/constants/actionTypes';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: '#484848',
  },
  inputInput: {
    border: '1px solid #EBEBEB !important',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: 420,
      '&:focus': {
        width: 560,
      },
    },
    height: '32px',
  },
}));

const SearchField = ({ location, history }) => {
  const stateContext = useContext(FiltersContext);
  const dispatch = useContext(DispatchContext);
  console.log('stateContext', stateContext);
  const [state, setState] = useState({
    address: '',
  });

  useEffect(() => {
    if (stateContext.location) {
      setState({
        address: stateContext.location.address,
      });
    }
    return () => {};
  }, [stateContext.location]);

  const classes = useStyles();

  const handleChange = (address) => {
    setState({ ...state, address });
  };

  const handleError = (error) => {
    console.error(error);
  };

  const handleSelect = (address, geocodeByAddress, getLatLng) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setState({ address });
        dispatch({
          type: types.UPDATE_FILTER,
          filter: {
            location: {
              value: address,
              address,
              coordinates: latLng,
            },
          },
          history: history,
        });
      });
  };
  const { address } = state;

  return (
    <SearchAutoComplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      onError={handleError}
    >
      <InputBase
        placeholder="Filter places..."
        type="search"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
      />
    </SearchAutoComplete>
  );
};

export default withRouter(SearchField);
