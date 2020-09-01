import React from 'react';
import PropTypes from 'prop-types';
import PlaceCard from './PlaceCard';

function GridPlaces({ headline, places }) {
  const Places = places
    .map((place) => <PlaceCard key={place._id} {...place} />)
    .slice(0, 8);

  return (
    <div className="grid-view">
      <h2 className="grid-view__headline">{headline}</h2>
      <div className="grid-view__grid">{Places}</div>
    </div>
  );
}

GridPlaces.propTypes = {
  headline: PropTypes.string.isRequired,
  places: PropTypes.array.isRequired,
};

export default GridPlaces;
