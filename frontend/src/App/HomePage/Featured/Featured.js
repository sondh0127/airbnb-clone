import React from 'react';

import PropTypes from 'prop-types';

import Explore from './Explore';
import Highlight from './Hightlight';
import Slider from './Slider';
import Top from './Top';

function Featured({ destinations, places }) {
  return (
    <section className="featured">
      <Explore />
      <Highlight
        title="Introducing Airbnb Plus!"
        subtitle="A new selection of homes verified for quality & comfort"
        cta="Explore Homes"
        image_url="https://a0.muscache.com/4ea/air/v2/pictures/f4d72213-3cc2-403c-8482-0e2b7bb17b67.jpg?t=c:w800-h320,r:w800-h320-sfit,e:fjpg-c75"
      />
      <Slider headline="Recommended for you" destinations={destinations} />
      <Top places={places} destinations={destinations} />
    </section>
  );
}

Featured.propTypes = {
  destinations: PropTypes.array.isRequired,
  places: PropTypes.array.isRequired,
};

export default Featured;
