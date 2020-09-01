import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import CheckCircle from '@material-ui/icons/CheckCircle';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import DeterminateProgress from './DeterminateProgress';
import AddListingLayout from '../Layout/AddListingLayout';

import {
  fetchListing,
  publishListing,
  resetListing,
} from '../../store/actions/ListingActions';

const STEPS = {
  step1: {
    step: 1,
    title: 'Start with the basics',
    label: 'Beds, bathrooms, amenities, and more',
    firstPage: 'room',
  },
  step2: {
    step: 2,
    title: 'Set the scene',
    label: 'Photos, short description, title',
    firstPage: 'photos',
  },
  step3: {
    step: 3,
    title: 'Get ready for guests',
    label: 'Booking settings, calendar, price',
    firstPage: 'guest_requirements',
  },
};

const S = {
  DivHeaderContainer: styled.div`
    overflow: hidden !important;
    position: fixed !important;
    z-index: 121 !important;
    display: table;
    width: 100%;
    background: #ffffff !important;
    border-bottom: 1px solid #e4e4e4 !important;
  `,

  WrapperLogoSvg: styled.div`
    display: table-cell !important;
    height: 64px !important;
    width: 64px !important;
    position: relative !important;
    text-align: center !important;
    text-decoration: none !important;
    transition: 0.25s color !important;
    vertical-align: middle !important;
    white-space: nowrap !important;
  `,

  Svg: styled.div`
    padding: 0px 15px 0px 21px;
    color: #008489 !important;
    display: inline-block !important;
    vertical-align: middle !important;
    font-size: 34px !important;
    transition: 0.25s color !important;
  `,

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

  TypographyStyled: styled(Typography)`
    & a {
      text-decoration: none !important;
      color: #008489;
    }
    & a:hover {
      text-decoration: underline !important;
    }
  `,
};

const getURLPath = (url) =>
  url[url.length - 1] === '/' ? url.substring(0, url.length - 1) : url;

const PageSelectStep = ({
  match,
  completed,
  fetchListing,
  publishListing,
  isPublish,
  resetListing,
}) => {
  useEffect(() => {
    if (match.params.listingId) {
      fetchListing(match.params.listingId);
    } else {
      resetListing();
    }
  }, [match.params.listingId]);
  return (
    <AddListingLayout>
      <S.WrapperMain>
        <Grid container justify="center" spacing={8}>
          <Grid item md={7}>
            <S.WrapperLeft>
              <div style={{ marginBottom: 30 }}>
                <Typography variant="h4" style={{ marginBottom: 16 }}>
                  Become an Airbnb host
                </Typography>
                <Typography variant="body1">
                  Now let’s get some details about your place so you can publish your
                  listing.
                </Typography>
              </div>
              {Object.values(STEPS).map(({ step, title, label, firstPage }, index) => {
                const visible = step === 1 || completed[`step${step - 1}`] === 100;
                const isEdit = completed[`step${step}`] === 100;

                const firstPagePath = getURLPath(match.url) + `/${firstPage}`;
                return (
                  <React.Fragment key={index}>
                    <Grid container>
                      <Grid item md={10} style={visible ? null : { opacity: 0.53 }}>
                        {isEdit ? (
                          <>
                            <Typography variant="body1">{label}</Typography>
                            <S.TypographyStyled variant="body1" color="primary">
                              <Link to={firstPagePath}>Change</Link>
                            </S.TypographyStyled>
                          </>
                        ) : (
                          <>
                            <Typography variant="subtitle2" style={{ color: '#bbb' }}>
                              {`STEP ${step}`}
                            </Typography>
                            <Typography variant="h5">{title}</Typography>
                            <Typography variant="body1">{label}</Typography>
                            {visible && (
                              <>
                                <S.WrapperProgress>
                                  <DeterminateProgress
                                    completed={completed[`step${step}`]}
                                  />
                                </S.WrapperProgress>
                                <Link to={firstPagePath}>
                                  <Button
                                    size="small"
                                    color="primary"
                                    variant="contained"
                                    type="button"
                                  >
                                    Continue
                                  </Button>
                                </Link>
                              </>
                            )}
                          </>
                        )}
                      </Grid>
                      <Grid item md={2}>
                        {isEdit && (
                          <div style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                            <CheckCircle color="primary" style={{ fontSize: 45 }} />
                          </div>
                        )}
                      </Grid>
                    </Grid>
                    <Divider light />
                  </React.Fragment>
                );
              })}
              {completed.step3 === 100 && (
                <>
                  {isPublish ? (
                    <Button
                      size="small"
                      color="secondary"
                      variant="contained"
                      type="button"
                      onClick={() => publishListing(match.params.listingId, false)}
                    >
                      Unpublish listing
                    </Button>
                  ) : (
                    <Link to={`/listings/${match.params.listingId}`}>
                      <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        type="button"
                        onClick={() => publishListing(match.params.listingId, true)}
                      >
                        Publish listing
                      </Button>
                    </Link>
                  )}
                </>
              )}
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
};

const mapStateToProps = (state) => ({
  completed: state.ListingReducer.listing.completed,
  isPublish: state.ListingReducer.listing.is_publish,
});

const mapDispatchToProps = {
  fetchListing,
  publishListing,
  resetListing,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageSelectStep);
