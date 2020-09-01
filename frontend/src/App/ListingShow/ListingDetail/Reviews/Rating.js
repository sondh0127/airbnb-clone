import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StarRating from './StarRating';

const Rating = ({ rating }) => (
  <Divrating>
    <DivratingContainer>
      <SpanWord>{rating[1]}</SpanWord>
    </DivratingContainer>
    <DivratingContainer>
      <Divstar>
        <span>
          <StarRating rating={rating[0]} />
        </span>
      </Divstar>
    </DivratingContainer>
  </Divrating>
);

Rating.propTypes = {
  rating: PropTypes.node.isRequired,
};

const Divrating = styled.div`
  margin-bottom: 12px;
  overflow: hidden;
  margin-left: -8px !important;
  margin-right: -8px !important;
`;

const DivratingContainer = styled.div`
  padding-left: 8px !important;
  padding-right: 8px !important;
  min-height: 1px !important;
  position: relative !important;
  width: 50% !important;
  float: left !important;
`;

const SpanWord = styled.div`
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.375em !important;
  color: #484848 !important;
`;

const Divstar = styled.div`
  float: right !important;
  padding-top: 2px !important;
`;

export default Rating;
