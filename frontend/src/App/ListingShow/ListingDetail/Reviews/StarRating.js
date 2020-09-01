import React from 'react';
import PropTypes from 'prop-types';
import svg from './Svg';
import styled from 'styled-components';

const StarRating = ({ rating, small }) => {
  let starRating = rating;
  const stars = [];
  for (let i = 0; i < 5; i += 1) {
    if (starRating >= 1) {
      stars.push(
        <SpanStar small={small} key={i}>
          {svg.star}
        </SpanStar>
      );
    } else if (starRating < 1 && starRating > 0) {
      stars.push(
        <SpanStar small={small} key={i}>
          {svg.halfStar}
        </SpanStar>
      );
    } else {
      stars.push(
        <SpanStar small={small} key={i}>
          {svg.emptyStar}
        </SpanStar>
      );
    }
    starRating -= 1;
  }
  return stars;
};

const SpanStar = styled.span`
  display: inline-block !important;
  color: #008489 !important;
  font-size: 16px !important;
  height: 16px !important;
  margin-right: 6px !important;
  width: 16px !important;

  ${(props) =>
    props.small
      ? `font-size: 9px !important;
      height: 9px !important;
      margin-right: 1px !important;
      width: 9px !important;`
      : null};
`;

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default StarRating;
