import React from 'react';
import { shallow, mount } from 'enzyme';
import RatingsList from '../ratingsList';

describe('Ratings Component', () => {
  const wrapper = mount(
    <RatingsList
      ratings={[1, 2, 3, 4, 5, 6]}
      displayStarRatings={() => [1, 2, 3, 4, 5]}
    />
  );

  it('should render without throwing an error', () => {
    expect(wrapper.find('.ratingList').exists()).toBe(true);
  });

  it('should render 6 ratings', () => {
    expect(wrapper.find('#rating').length).toEqual(6);
  });
});
