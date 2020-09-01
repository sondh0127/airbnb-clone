import React, { useState } from 'react';
import styled from 'styled-components';
import RatingsList from './RatingsList';
import ReviewSearch from './ReviewSearch';
import BackToAllReviews from './BackToAllReviews';
import Review from './Review';
import Paginate from '../../../../shared/Paginate';
import CreateReview from './CreateReview';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { getRatingAVG, getTotalRating } from '../../ultis';

const DivlistingReview = styled.div``;

const SpanSearchBold = styled.span`
  font-weight: 700;
`;

const Divborders = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
`;

const DivinnerBorder = styled.div`
  border-bottom: 1px solid #dbdbdb !important;
`;

const sortedByDate = (reviews) => {
  return [...reviews].sort((a, b) => {
    const aa = a.review_date.split('/');
    const bb = b.review_date.split('/');
    return bb[0] - aa[0] || bb[1] - aa[1] || bb[2] - aa[2];
  });
};

const ListingReview = ({ reviews, bookingId }) => {
  const [state, setState] = useState({
    currentReviews: [...reviews],
    currentPage: 0,
    hasBeenSearched: false,
    searchedWord: '',
  });

  const findAndBoldWord = (text, word) => {
    return (
      <span>
        {text.split(word).reduce((prev, current, i) => {
          if (!i) {
            return [current];
          }
          return prev.concat(
            <SpanSearchBold key={word + current}>{word}</SpanSearchBold>,
            current
          );
        }, [])}
      </span>
    );
  };

  const handlePageClick = (data) => {
    setState({
      ...state,
      currentPage: Number(data.selected),
    });
  };

  const resetFilter = () => {
    setState({
      ...state,
      hasBeenSearched: false,
      currentReviews: reviews,
      currentPage: 0,
    });
  };

  const filterReviews = (searchText) => {
    if (searchText !== '') {
      const copyData = JSON.parse(JSON.stringify(reviews));
      const query = searchText.toLowerCase().trim();
      const filteredReviews = copyData
        .filter((review) => {
          const review_text = review.body.toLowerCase();
          const host_text = review.host_text && review.host_text.toLowerCase();

          // return host_text.includes(query) || review_text.includes(query);
          return review_text.includes(query);
        })
        .map((review) => {
          const preparedReview = { ...review };
          preparedReview.review_text = findAndBoldWord(review.body, query);
          // preparedReview.host_text = findAndBoldWord(review.host_text, query);
          return preparedReview;
        });
      setState({
        ...state,
        hasBeenSearched: true,
        currentPage: 0,
        searchedWord: searchText,
        currentReviews: filteredReviews,
      });
    } else {
      resetFilter();
    }
  };

  const reviewList = [...state.currentReviews].slice(
    7 * state.currentPage,
    7 * state.currentPage + 7
  );

  const pageCount = Math.ceil(state.currentReviews.length / 7);

  return (
    <DivlistingReview>
      {reviews && reviews.length > 0 ? (
        <>
          <ReviewSearch
            totalReviews={reviews.length}
            totalRating={getTotalRating(reviews)}
            filterReviews={filterReviews}
          />
          <Divborders>
            <DivinnerBorder />
          </Divborders>
          <div id="review">
            <div>
              {state.hasBeenSearched ? (
                <div id="backToReviews">
                  <BackToAllReviews
                    resetFilter={resetFilter}
                    currentReviewsLength={state.currentReviews.length}
                    searchedWord={state.searchedWord}
                  />
                </div>
              ) : (
                <div id="ratings">
                  <RatingsList ratings={getRatingAVG(reviews)} />
                </div>
              )}
            </div>
            <Divborders>
              <DivinnerBorder />
            </Divborders>
            {bookingId && <CreateReview bookingId={bookingId} />}
            <div id="reviewList">
              {reviewList.map((review) => (
                <Review review={review} key={review.id} />
              ))}
            </div>

            {reviewList.length > 7 && (
              <div id="pages">
                <Paginate pageCount={pageCount} handlePageClick={handlePageClick} />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <Typography variant="h5">No reviews (yet)</Typography>
          {bookingId && <CreateReview bookingId={bookingId} />}
        </>
      )}
    </DivlistingReview>
  );
};
const mapStateToProps = (state) => ({
  reviews: sortedByDate(state.ReviewReducer.reviews),
  bookingId: state.BookingsReducer.booking.id,
});

export default connect(
  mapStateToProps,
  null
)(ListingReview);
