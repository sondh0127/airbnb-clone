import React from 'react';
import { shallow, mount } from 'enzyme';
import Review from '../review';

describe('ReviewList Component', () => {
  const review = {
    accuracy_rating: 1,
    checkin_rating: 3,
    cleanliness_rating: 4,
    communication_rating: 1,
    guest_name: 'Kitti',
    guest_photo: 'https://s3-us-west-1.amazonaws.com/guestpics/GpXTZBo-9.jpg',
    host_id: 30,
    host_name: 'Correna',
    host_photo: 'https://s3-us-west-1.amazonaws.com/guestpics/7DXR56r (1).jpg',
    host_text:
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    id: 1916,
    location_rating: 2,
    review_date: '2018/04/27',
    review_text:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.↵↵Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Add more length to this sentance for the test.',
    value_rating: 2,
  };
  const hostResponse = {
    accuracy_rating: 1,
    checkin_rating: 3,
    cleanliness_rating: 4,
    communication_rating: 1,
    guest_name: 'Kitti',
    guest_photo: 'https://s3-us-west-1.amazonaws.com/guestpics/GpXTZBo-9.jpg',
    host_id: 31,
    host_name: 'Correna',
    host_photo: 'https://s3-us-west-1.amazonaws.com/guestpics/7DXR56r (1).jpg',
    host_text:
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    id: 1900,
    location_rating: 2,
    review_date: '2018/04/27',
    review_text:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.↵↵Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    value_rating: 2,
  };

  const wrapper = mount(<Review review={review} />);

  it('should render without throwing an error', () => {
    expect(wrapper.find('.review').exists()).toBe(true);
  });

  it('should not show report component', () => {
    expect(wrapper.find('#report').exists()).toBe(false);
  });

  it('should render thank you when handleSubmit is triggered', () => {
    wrapper.instance().handleSubmitClick();
    wrapper.update();
    expect(wrapper.find('#reportThankyou').exists()).toBe(true);
  });

  it('should not render hostResponse component when id % 10 !== 0', () => {
    expect(wrapper.find('#hostResponse').exists()).toBe(false);
  });

  it('should show render hostResponse component when id % 10 === 0', () => {
    const wrapper = mount(<Review review={hostResponse} />);
    expect(wrapper.find('#hostResponse').exists()).toBe(true);
  });

  it('should change the date data into a more readable format', () => {
    expect(wrapper.find('.date').text()).toBe('April 2018');
  });

  it('should only display 280 character even if the length is longer', () => {
    expect(Review.shortenText(wrapper.instance().props.review.body).length).toBe(
      280
    );
  });

  // redo this test
  it('should only display 280 character even if the length is longer and object is not a string', () => {
    const text = {
      props: {
        children: [
          'In hac habitasse platea dictumst.',
          <span>Morbi</span>,
          'vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.↵↵Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
        ],
      },
    };
    expect(Review.shortenText(text).length).toBe(undefined);
  });

  it('should be a super user if id % 5 === 0', () => {
    expect(wrapper.find('.superUser')).toBeTruthy();
  });

  it('should not be a super user if id % 5 !== 0', () => {
    expect(wrapper.find('#superUser').length).toEqual(0);
  });
});
