import React from 'react';

import Rating from './Rating';

function PlaceCard({ title, price, preview_url, rating, tag, destination, type }) {
  const units = {
    0: 'person',
    1: 'night',
  };

  const unit = units[type];

  return (
    <div className="place-card">
      <img className="place-card__preview" src={preview_url} alt={title} />
      <div className="place-card__details">
        <span className="place-card__tag">{tag}</span>
        {' · '}
        <span className="place-card__destination">{destination}</span>
      </div>
      <h4 className="place-card__title">{title}</h4>
      <span className="place-card__price">
        ${price.amount} {price.currency} per {unit}
      </span>
      <Rating rate={rating} />
    </div>
  );
}

export default PlaceCard;
