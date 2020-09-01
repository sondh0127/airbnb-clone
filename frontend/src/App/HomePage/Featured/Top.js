import React from 'react';
import PropTypes from 'prop-types';

import GridPlaces from './GridPlaces';
import Slider from './Slider';

function Top({ destinations, places }) {
  const experiences = places.filter((place) => place.type === 0);

  return (
    <div className="top">
      <GridPlaces headline="Top-rated experiences" places={experiences} />
      <Slider headline="Top Locations for You!" destinations={destinations} />
    </div>
  );
}

Top.propTypes = {
  destinations: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
};

export default Top;
