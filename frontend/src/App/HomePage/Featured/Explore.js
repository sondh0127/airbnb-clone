import React from 'react';

function Explore() {
  return (
    <div className="explore">
      <h2 className="explore__title">Explore Airbnmex</h2>
      <a href="/" className="explore-card__link">
        <div className="explore-card">
          <div className="explore-card__image">
            <img
              alt="Home"
              src="https://a0.muscache.com/4ea/air/v2/pictures/8b7519ec-2c82-4c09-8233-fd4d2715bbf9.jpg?t=r:w375-h250-sfit,e:fjpg-c80"
            />
          </div>
          <span className="explore-card__title">Homes</span>
        </div>
      </a>
      <a href="/" className="explore-card__link">
        <div className="explore-card">
          <div className="explore-card__image">
            <img
              src="https://a0.muscache.com/4ea/air/v2/pictures/da2d8e97-90b7-409f-94ac-5ab0327c289b.jpg?t=r:w375-h250-sfit,e:fjpg-c80"
              alt="Restaurants"
            />
          </div>
          <span className="explore-card__title">Restaurants</span>
        </div>
      </a>
      <a href="/" className="explore-card__link">
        <div className="explore-card">
          <div className="explore-card__image">
            <img
              alt="Experiences"
              src="https://a0.muscache.com/4ea/air/v2/pictures/cb8b3101-d419-4c17-8e2f-4989b39b98c3.jpg?t=r:w375-h250-sfit,e:fjpg-c80"
            />
          </div>
          <span className="explore-card__title">Experiences</span>
        </div>
      </a>
    </div>
  );
}

export default Explore;
