import React from 'react';

import PropTypes from 'prop-types';

import Scroll from 'react-horizontal-scrolling-menu';
import Destination from './Destination';

function Slider({ headline, destinations }) {
  const destinationCards = destinations.map((destination) => (
    <Destination key={destination._id} {...destination} />
  ));

  return (
    <div className="slider">
      <h2 className="slider__headline">{headline}</h2>
      <Scroll data={[...destinationCards, ...destinationCards]} />
    </div>
  );
}

Slider.propTypes = {
  headline: PropTypes.string.isRequired,
  destinations: PropTypes.array.isRequired,
};

export default Slider;
