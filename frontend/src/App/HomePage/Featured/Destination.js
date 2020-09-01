import React from 'react';

function Destination({ name, averagePrice, previewUrl }) {
  return (
    <div
      className="destination"
      style={{
        backgroundImage: `url('${previewUrl}')`,
      }}
    >
      <h3 className="destination__name">{name}</h3>
      <span className="destination__average-price">
        {averagePrice.amount} {averagePrice.currency} per night
      </span>
    </div>
  );
}

export default Destination;
