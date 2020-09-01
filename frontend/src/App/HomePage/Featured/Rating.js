import React from 'react';
import PropTypes from 'prop-types';

function Rating({ rate }) {
  if (rate < 0 || rate > 5) {
    throw new Error('Rate invalid, it must be between 0 and 5');
  }

  const formatted = rate.toString().substring(0, 4);

  return (
    <div className="rating">
      <span className="rating__number">{formatted}</span>
      <i className="material-icons">star</i>
    </div>
  );
}

Rating.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default Rating;
