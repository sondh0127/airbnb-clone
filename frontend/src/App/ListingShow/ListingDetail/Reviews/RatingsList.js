import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Rating from './Rating';

const DivratingList = styled.div`
  margin-left: -8px !important;
  margin-right: -8px !important;
  overflow: hidden;
`;

const DivRating = styled.div`
  width: 50% !important;
  float: left !important;
  padding-left: 8px !important;
  padding-right: 8px !important;
  min-height: 1px !important;
  position: relative !important;
`;

const RatingsList = ({ ratings, displayStarRatings }) => {
  const accuracyCommunicationCleanliness = [
    [ratings[0], 'Accuracy'],
    [ratings[1], 'Communication'],
    [ratings[2], 'Cleanliness'],
  ];
  const locationCheckinValue = [
    [ratings[3], 'Location'],
    [ratings[4], 'Checkin'],
    [ratings[5], 'Value'],
  ];
  return (
    <DivratingList>
      <DivRating>
        {accuracyCommunicationCleanliness.map((rating, i) => (
          <Rating rating={rating} key={i} />
        ))}
      </DivRating>
      <DivRating>
        <div style={{ paddingLeft: 16 }}>
          {locationCheckinValue.map((rating, i) => (
            <Rating rating={rating} key={i} />
          ))}
        </div>
      </DivRating>
    </DivratingList>
  );
};

RatingsList.propTypes = {
  ratings: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default RatingsList;
