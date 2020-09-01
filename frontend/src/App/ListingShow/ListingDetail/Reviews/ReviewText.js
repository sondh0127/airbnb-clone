import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ReviewText = ({ body, shortText, shortenText, handleReadMoreClick }) => {
  if (shortenText(body) && shortText) {
    return (
      <DivReviewText>
        {shortenText(body)}
        ...
        <ButtonreadMore onClick={handleReadMoreClick}>Read More</ButtonreadMore>
      </DivReviewText>
    );
  }
  return <DivReviewText>{body}</DivReviewText>;
};

const DivReviewText = styled.div`
  margin: 0px !important;
  word-wrap: break-word !important;
  font-size: 16px !important;
  font-weight: 400 !important;
  line-height: 1.375em !important;
  color: #484848 !important;
`;

const ButtonreadMore = styled.button`
  color: #008489 !important;
  user-select: auto !important;
  text-align: left !important;
  background: transparent !important;
  cursor: pointer !important;
`;

ReviewText.propTypes = {
  body: PropTypes.node.isRequired,
  shortText: PropTypes.bool.isRequired,
  shortenText: PropTypes.func.isRequired,
  handleReadMoreClick: PropTypes.func.isRequired,
};

export default ReviewText;
