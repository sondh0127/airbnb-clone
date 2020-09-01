import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

import DatesFilter from './FilterPopup/DatesFilter';
import GuestsFilterPopup from './FilterPopup/GuestsFilterPopup';
import HomeTypesFilter from './FilterPopup/HomeTypesFilter';
import PriceFilter from './FilterPopup/PriceFilter';
import MapSwitch from './MapSwitch';
import { DispatchContext, FiltersContext } from '../../../store/context/filtersContext';
import moment from '../../HomePage/SearchForm';
import * as types from '../../../store/constants/actionTypes';

const S = {
  FilterBar: styled(AppBar)`
    width: 100%;
    height: 49px;
    z-index: 9;
    position: fixed;
    background: rgb(255, 255, 255);
    box-shadow: none;
    border-bottom: 1px solid rgb(235, 235, 235);

    ${(props) => (props.mapshowing ? null : `padding: 0 56px;`)};
  `,

  Toolbar: styled(Toolbar)`
    height: 48px;
    display: flex;
    padding: 0 40px;
    justify-content: space-between;
  `,
};

const useStyles = makeStyles((theme) => ({
  leftGrid: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  rightGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  buttons: {
    margin: '0 0px',
    minHeight: 20,
    padding: '5px 10px',
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  toolbarFix: {
    minHeight: 48,
  },
}));

const FilterBar = ({ mapShowing, toggleMapShowing, history }) => {
  const state = useContext(FiltersContext);
  const dispatch = useContext(DispatchContext);
  const classes = useStyles();
  return (
    <Formik
      enableReinitialize
      initialValues={state}
      validationSchema={Yup.object({
        // room_type: Yup.string().required('Room type is a required field'),
      })}
      validate={(values) => {
        let errors = {};
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
        console.log('values', values);
        dispatch({ type: types.UPDATE_FILTER, filter: values, history: history });
      }}
      render={(formikProps) => {
        return (
          <S.FilterBar position="static" mapshowing={mapShowing.toString()}>
            <S.Toolbar variant="regular" classes={{ regular: classes.toolbarFix }}>
              <Grid container spacing={0}>
                <Grid item xs className={classes.leftGrid}>
                  <Form autoComplete="off">
                    <Grid container spacing={1}>
                      <Grid item>
                        <DatesFilter formikProps={formikProps} />
                      </Grid>
                      <Grid item>
                        <GuestsFilterPopup formikProps={formikProps} />
                      </Grid>
                      <Grid item>
                        <HomeTypesFilter formikProps={formikProps} />
                      </Grid>
                      <Grid item>
                        <PriceFilter formikProps={formikProps} />
                      </Grid>
                    </Grid>
                  </Form>
                </Grid>
                <Grid item xs className={classes.rightGrid}>
                  <FormControlLabel
                    control={
                      <MapSwitch checked={mapShowing} onChange={toggleMapShowing} />
                    }
                    color="primary"
                    label={
                      <Typography variant="body2" color="textPrimary">
                        Show Map
                      </Typography>
                    }
                    labelPlacement="start"
                  />
                </Grid>
              </Grid>
            </S.Toolbar>
          </S.FilterBar>
        );
      }}
    />
  );
};

export default FilterBar;
