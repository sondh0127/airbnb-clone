import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Select } from 'formik-material-ui';
import times from 'lodash/times';

import FormikPlaceSearch from './FormikPlaceSearch';
import AddListingLayout from '../Layout/AddListingLayout';

const S = {
  // Main
  WrapperMain: styled.div`
    margin-left: auto;
    margin-right: auto;
    max-width: 1310px;
    background-color: #fff;
    padding-top: 74px !important;
  `,

  WrapperPhoto: styled.div`
    width: 100%;
    height: auto;
    position: relative !important;
  `,

  WrapperLeft: styled.div`
    margin: 58px 93.5px 100px 100px;
    max-width: 470px;
  `,
  WrapperProgress: styled.div`
    height: 10px;
    margin: 10px 0;
  `,
};

class PageSelectStep extends Component {
  static propTypes = {};

  render() {
    const { completed, match } = this.props;

    return (
      <AddListingLayout>
        <S.WrapperMain>
          <Grid container justify="center" spacing={8}>
            <Grid item md={7}>
              <S.WrapperLeft>
                <div style={{ marginBottom: 30 }}>
                  <Typography variant="h5">
                    Let’s get started listing your space.
                  </Typography>
                </div>
                <>
                  <Grid container>
                    <Grid item md={10}>
                      <>
                        <Typography variant="subtitle2" style={{ color: '#bbb' }}>
                          STEP 1
                        </Typography>
                        <Typography variant="h5" style={{ marginBottom: 18 }}>
                          What kind of place do you have?
                        </Typography>
                        <Formik
                          initialValues={{
                            room_type: 'entire_place',
                            num_guests: 4,
                            country: '',
                            street: '',
                            city: '',
                            state: '',
                            center: {
                              lat: 20.99912999999998,
                              lng: 105.84042999999997,
                            },
                          }}
                          onSubmit={(values, { setSubmitting }) => {

                            // history.push('/become-a-host');
                            // setTimeout(() => {
                            //   updateListingInfo({
                            //     listing: values,
                            //     user: null,
                            //   });
                            //   setSubmitting(false);
                            // }, 400);
                          }}
                          render={({ handleSubmit }) => {
                            return (
                              <>
                                <Form autoComplete="off">
                                  <Grid container spacing={8} style={{ marginBottom: 8 }}>
                                    <Grid item md={6}>
                                      <Field
                                        name="room_type"
                                        type="select"
                                        component={Select}
                                        native
                                        fullWidth
                                        input={
                                          <OutlinedInput
                                            margin="dense"
                                            id="bedrooms"
                                            name="bedrooms"
                                            labelWidth={0}
                                          />
                                        }
                                      >
                                        <option value="entire_home">Entire place</option>
                                        <option value="private_room">Private room</option>
                                        <option value="shared_room">Shared room</option>
                                      </Field>
                                    </Grid>
                                    <Grid item md={6}>
                                      <Field
                                        name="num_guests"
                                        type="select"
                                        component={Select}
                                        native
                                        fullWidth
                                        input={
                                          <OutlinedInput margin="dense" labelWidth={0} />
                                        }
                                      >
                                        {times(16, (t) => {
                                          const n = t + 1;
                                          return (
                                            <option key={n} value={n}>
                                              {`for ${n} ${n === 1 ? `guest` : `guest`}`}
                                            </option>
                                          );
                                        })}
                                      </Field>
                                    </Grid>
                                    <Grid item md={12}>
                                      <Field
                                        name="location"
                                        component={FormikPlaceSearch}
                                      />
                                    </Grid>
                                  </Grid>
                                </Form>
                              </>
                            );
                          }}
                        />
                      </>
                    </Grid>
                    <Grid item md={2} />
                  </Grid>
                </>

                <Link to={`${match.path}/room`}>
                  <Button size="small" color="primary" variant="contained" type="button">
                    Continue
                  </Button>
                </Link>
              </S.WrapperLeft>
            </Grid>
            <Grid item md={5}>
              <S.WrapperPhoto>
                <img
                  src="https://a0.muscache.com/airbnb/static/b12a70f632d3d127a38a67afde7cc8ec.png"
                  alt="Get started"
                  width="100%"
                  height="auto"
                />
              </S.WrapperPhoto>
            </Grid>
          </Grid>
        </S.WrapperMain>
      </AddListingLayout>
    );
  }
}

const mapStateToProps = (state) => ({
  completed: state.ListingReducer.listing.completed,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageSelectStep);
