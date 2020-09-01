import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import { Formik, Form, Field } from 'formik';
import { RadioGroup } from 'formik-material-ui';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import styled from 'styled-components';
import { WrapperTable, WrapperCell } from '../../shared/UI/Wrapper';
import AddListingLayout from '../Layout/AddListingLayout';
import { fetchListingByUser } from '../../store/actions/ListingActions';

const roomTypes = {
  entire_place: 'Entire place',
  private_room: 'Private room',
  shared_room: 'Shared room',
};

const Label = ({ label, thumb, room_type }) => (
  <WrapperTable fullWidth>
    <WrapperCell>
      <S.DivThumbWrapper>
        <S.DivThumb thumb={thumb} />
      </S.DivThumbWrapper>
    </WrapperCell>
    <WrapperCell fullWidth>
      {label && <Typography variant="body1">{label}</Typography>}
      <Typography variant="body1">{roomTypes[room_type]}</Typography>
    </WrapperCell>
  </WrapperTable>
);

const mapStateToProps = (state) => ({
  userListings: state.ListingReducer.listings,
});

const mapDispatchToProps = {
  fetchListingByUser,
};
const AddListingOption = ({ fetchListingByUser, history, userListings }) => {
  useEffect(() => {
    fetchListingByUser();
  }, []);
  const unPublished = userListings.filter((listing) => !listing.is_publish);
  const published = userListings.filter((listing) => listing.is_publish);
  console.log('unPublished', unPublished);
  console.log('published', published);
  return (
    <AddListingLayout>
      <S.WrapperContainer>
        <S.DivContainer>
          <section>
            <Typography variant="h4" style={{ marginBottom: 8 }}>
              How would you like to start?
            </Typography>
            <Formik
              initialValues={{
                listing_id: '',
              }}
              onSubmit={(values, { setSubmitting }) => {
                let listingId = values.listing_id;

                if (listingId === 'new') {
                  history.push('/become-a-host');
                } else if (listingId.includes('_duplicate')) {
                  // do duplicate listing async
                } else {
                  history.push(`/become-a-host/${values.listing_id}`);
                }
                setSubmitting(false);
              }}
            >
              {({ isSubmitting, handleSubmit }) => (
                <Form autoComplete="off">
                  <Field name="listing_id" component={RadioGroup}>
                    <S.FormControlLabel
                      value="new"
                      control={<Radio color="primary" disabled={isSubmitting} />}
                      label={<Label label="Create a new listing" />}
                      disabled={isSubmitting}
                    />
                    {unPublished.length > 0 && (
                      <>
                        <S.WrapperText>Finish a listing in progress</S.WrapperText>
                        {unPublished.map(
                          ({ id, listing_title, room_type, photos }, index) => {
                            return (
                              <S.FormControlLabel
                                key={index + id}
                                value={`${id}`}
                                control={
                                  <Radio color="primary" disabled={isSubmitting} />
                                }
                                label={
                                  <Label
                                    room_type={room_type}
                                    label={listing_title}
                                    thumb={photos[0].url}
                                  />
                                }
                                disabled={isSubmitting}
                              />
                            );
                          }
                        )}
                      </>
                    )}
                    {published.length > 0 && (
                      <>
                        <S.WrapperText>Edit published listings</S.WrapperText>
                        {published.map(
                          ({ id, listing_title, room_type, photos }, index) => {
                            return (
                              <S.FormControlLabel
                                key={index + id}
                                value={`${id}`}
                                control={
                                  <Radio color="primary" disabled={isSubmitting} />
                                }
                                label={
                                  <Label
                                    room_type={room_type}
                                    label={listing_title}
                                    thumb={photos[0].url}
                                  />
                                }
                                disabled={isSubmitting}
                              />
                            );
                          }
                        )}
                      </>
                    )}
                  </Field>
                  <S.WrapperNextButton>
                    <WrapperTable fullWidth>
                      <WrapperCell fullWidth />
                      <WrapperCell>
                        <S.DivButton>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={handleSubmit}
                          >
                            Next
                          </Button>
                        </S.DivButton>
                      </WrapperCell>
                    </WrapperTable>
                  </S.WrapperNextButton>
                </Form>
              )}
            </Formik>
          </section>
        </S.DivContainer>
      </S.WrapperContainer>
    </AddListingLayout>
  );
};

const S = {
  WrapperContainer: styled.div`
    padding-top: 128px;
    margin-left: 32px;
    margin-right: 32px;
    padding-bottom: 128px;
  `,

  DivContainer: styled.div`
    max-width: 900px;
  `,

  DivThumbWrapper: styled.div`
    margin-right: 16px !important;
    background-color: #bbbbbb !important;
    width: 96px;
    height: 64px;
    position: relative !important;
  `,

  DivThumb: styled.div`
    width: 96px;
    height: 64px;
    position: absolute !important;
    background-size: cover !important;
    background-position: 50% 50% !important;
    background-repeat: no-repeat !important;
    background-image: url(${(props) =>
      props.thumb
        ? props.thumb
        : `https://a0.muscache.com/pictures/acbbe4a6-18b3-4c73-a7f6-891dbdb4d97b.jpg`});
  `,

  WrapperNextButton: styled.div`
    left: 32px !important;
    right: 32px !important;
    background-color: #ffffff !important;
    border-top: 1px solid #d8d8d8 !important;
    box-shadow: 0 -9px 15px -7px rgba(0, 0, 0, 0.09) !important;
    bottom: 0px !important;
    position: fixed !important;
    z-index: 100 !important;
    min-height: 66px !important;
    padding: 0 24px !important;
    max-width: 932px !important;

    margin-top: 16px;
    margin-bottom: 16px;

    text-align: justify !important;
    line-height: 0 !important;
    display: flex !important;
    flex-wrap: wrap !important;
    align-items: center !important;
  `,

  DivButton: styled.div`
    display: inline-block !important;
    vertical-align: middle !important;
    &:after {
      content: '' !important;
      display: inline-block !important;
      vertical-align: top !important;
      width: 100% !important;
    }
  `,

  FormControlLabel: styled(FormControlLabel)`
    padding: 24px 0 24px;
    border-bottom: 1px solid #ebebeb !important;
  `,
  WrapperText: styled.div`
    padding-top: 24px;
    font-size: 17px;
    font-weight: 400;
  `,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddListingOption);
