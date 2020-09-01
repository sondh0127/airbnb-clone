import React from 'react';
import { shallow } from 'enzyme';
import Rating from '../rating';

describe('Ratings Component', () => {
  it('should render without throwing an error', () => {
    expect(
      shallow(
        <Rating
          displayStarRatings={() => [1, 2, 3]}
          rating={[3, 'Accuracy']}
          id={1}
          key={[3, 'Accuracy']}
        />
      )
        .find('#rating')
        .exists()
    ).toBe(true);
  });

  it('should render 5 stars', () => {
    const wrapper = shallow(
      <Rating
        displayStarRatings={() => [1, 2, 3, 4, 5]}
        rating={[3, 'Accuracy']}
        id={1}
        key={[3, 'Accuracy']}
      />
    );
    expect(wrapper.find('.stars').length).toEqual(5);
  });
});
