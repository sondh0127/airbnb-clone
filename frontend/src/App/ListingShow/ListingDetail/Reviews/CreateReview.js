import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Rating from 'react-rating';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import { Svg } from '../../../LoginSignup/styled';
import Fab from '@material-ui/core/Fab';
import { connect } from 'react-redux';
import { createReview } from '../../../../store/actions/ReviewActions';
import { ratingsType } from '../../ultis';

const S = {
  GridModalContainer: styled(Grid)`
    margin-bottom: 18px;
  `,

  GridModal: styled(Grid)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px;
    background-color: #ffffff;
    //box-shadow:
    padding: 0px 24px 24px;
    outline: none;
  `,
  GridCreateReview: styled(Grid)`
    padding: 24px;
  `,

  GridRating: styled(Grid)`
    padding: 5px 0;
    margin: 8px 0;
    & span {
      color: #008489;
    }
  `,

  GridStar: styled(Grid)`
    & .fa-2x {
      font-size: 1.5em;
    }
  `,

  GridBody: styled(Grid)``,

  DivCloseButton: styled.div`
    margin-bottom: 24px !important;
  `,
  Fab: styled(Fab)`
    background-color: transparent !important;
    outline: 0px !important;
    border-width: 0px !important;
    padding: 8px !important;
    margin: -8px !important;
    border-radius: 100% !important;
    width: 36px;
    height: 36px;
    box-shadow: none;
    &:hover {
      box-shadow: rgb(216, 216, 216) 0px 0px 4px 2px !important;
    }
  `,
};

const CreateReview = ({ createReview, listingId, bookingId, reviewState }) => {
  const initRatings = {};
  Object.keys(ratingsType).forEach((item) => {
    initRatings[item] = 0;
  });

  const [body, setBody] = useState('');
  const [ratings, setRatings] = useState(initRatings);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async () => {
    const unAbleToSubmit =
      Object.keys(ratings).filter((key) => ratings[key] === 0).length > 0 || body === '';
    if (unAbleToSubmit) {
      setError('Please select all the rating option and enter the comment !');
    } else {
      const { success, message } = await createReview(
        listingId,
        body,
        ratings,
        bookingId
      );

      if (!success) {
        setError(message);
      } else {
        setOpen(false);
      }
    }
  };

  const handleRating = (type, rating) => {
    setRatings({
      ...ratings,
      [type]: rating,
    });
    setError('');
  };

  return (
    <S.GridModalContainer>
      <Button onClick={() => setOpen(true)} color="primary">
        <Typography variant="subtitle1">Rate your experience</Typography>
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => setOpen(false)}
      >
        <S.GridModal>
          <S.GridCreateReview>
            <S.DivCloseButton>
              <S.Fab onClick={() => setOpen(false)}>{Svg.close}</S.Fab>
            </S.DivCloseButton>
            <S.GridRating>
              {error !== '' && (
                <Typography variant="subtitle1" color="secondary">
                  {error}
                </Typography>
              )}
              <Typography variant="h6" style={{ marginBottom: 16 }}>
                Rate your experience
              </Typography>
              <Grid container spacing={3}>
                {Object.keys(ratingsType).map((type, index) => (
                  <Grid item xs={6} key={index} container justify="space-between">
                    <Grid item xs={4}>
                      <Typography>{ratingsType[type]}</Typography>
                    </Grid>
                    <S.GridStar item style={{ marginRight: 36 }}>
                      <Rating
                        initialRating={ratings[type]}
                        onChange={(rating) => handleRating(type, rating)}
                        emptySymbol="far fa-star fa-2x"
                        fullSymbol="fas fa-star fa-2x"
                        fractions={2}
                      />
                    </S.GridStar>
                  </Grid>
                ))}
              </Grid>
            </S.GridRating>
            <S.GridBody container justify="space-between" alignItems="center">
              <Grid item xs={10}>
                <OutlinedInput
                  value={body}
                  onChange={(e) => {
                    setBody(e.target.value);
                    setError('');
                  }}
                  style={{ padding: 10 }}
                  multiline={true}
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Grid>
            </S.GridBody>
          </S.GridCreateReview>
        </S.GridModal>
      </Modal>
    </S.GridModalContainer>
  );
};
const mapStateToProps = (state) => ({
  listingId: state.ListingReducer.listing.id,
  reviewState: state.ReviewReducer,
});

const mapDispatchToProps = {
  createReview,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateReview);
