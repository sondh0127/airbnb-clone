import React from 'react';
import { shallow, mount } from 'enzyme';
import Search from '../search';

describe('Search Component', () => {
  const wrapper = mount(
    <Search
      handleSearchTextChange={() => {}}
      handleKeyPress={() => {}}
      totalRating={3}
      totalReviews={37}
      searchText="text"
      displayStarRatings={() => [1, 2, 3, 4, 5]}
      handleSearchClose={() => {}}
    />
  );

  it('should render without throwing an error', () => {
    expect(wrapper.find('#search').exists()).toBe(true);
  });
});
