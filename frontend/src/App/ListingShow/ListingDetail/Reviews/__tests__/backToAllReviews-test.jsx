import React from 'react';
import { shallow, mount } from 'enzyme';
import BackToAllReviews from '../backToAllReviews';

describe('BackToAllReviews Component', () => {
  const wrapper = mount(
    <BackToAllReviews
      handleBacktoAllReviewsClick={() => {}}
      currentReviewsLength={11}
      searchedWord="hello"
    />
  );

  it('should render without throwing an error', () => {
    expect(wrapper.find('#backToAllReviews').exists()).toBe(true);
  });

  it('should display the searched word', () => {
    expect(wrapper.find('.searchBold').text()).toEqual('"hello"');
  });

  it('should display the currentReviewsLength word', () => {
    expect(wrapper.find('.mentions').text()).toEqual(`11 guests have mentioned\"hello\"`);
  });
});
