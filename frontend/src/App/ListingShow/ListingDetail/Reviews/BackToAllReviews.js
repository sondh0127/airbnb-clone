import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DivBackToReviewsContainer = styled.div`
  margin-left: -8px !important;
  margin-right: -8px !important;
  overflow: hidden;
`;

const DivMentionsContainer = styled.div`
  width: 66.6667% !important;
  float: left !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  min-height: 1px !important;
  position: relative !important;
  text-align: left !important;
`;

const DivMentions = styled.div`
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 14px !important;
  font-weight: 400 !important;
  line-height: 1.2857142857142858em !important;
  color: #484848 !important;
`;

const SpanMentionBold = styled.span`
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  line-height: 1.2857142857142858em !important;
  color: #484848 !important;
`;

const ButtonBackToAllReviews = styled.button`
  color: #008489 !important;
  text-decoration-line: none !important;
  background: transparent !important;
  border: 0px !important;
  cursor: pointer !important;
  margin: 0px !important;
  padding: 0px !important;
  user-select: auto !important;
  text-align: left !important;
`;

const DivButtonBackContainer = styled.div`
  width: 33.3333% !important;
  float: left !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  min-height: 1px !important;
  position: relative !important;
  text-align: right !important;
`;

const BackToAllReviews = ({ resetFilter, currentReviewsLength, searchedWord }) => (
  <DivBackToReviewsContainer>
    <DivMentionsContainer>
      <DivMentions>
        {currentReviewsLength} guests have mentioned
        <SpanMentionBold>{` "${searchedWord}"`}</SpanMentionBold>
      </DivMentions>
    </DivMentionsContainer>
    <DivButtonBackContainer>
      <SpanMentionBold>
        <ButtonBackToAllReviews onClick={resetFilter}>
          Back to all reviews
        </ButtonBackToAllReviews>
      </SpanMentionBold>
    </DivButtonBackContainer>
  </DivBackToReviewsContainer>
);

BackToAllReviews.propTypes = {
  resetFilter: PropTypes.func.isRequired,
  currentReviewsLength: PropTypes.number.isRequired,
  searchedWord: PropTypes.string.isRequired,
};

export default BackToAllReviews;
