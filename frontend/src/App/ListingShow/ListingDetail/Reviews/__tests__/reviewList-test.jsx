import React from 'react';
import { shallow, mount } from 'enzyme';
import ReviewList from '../reviewList';

describe('ReviewList Component', () => {
  const reviews = [
    {
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
      id: 1915,
      location_rating: 2,
      review_date: '2018/04/27',
      review_text:
        'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.↵↵Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
      value_rating: 2,
    },
    {
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
      id: 1915,
      location_rating: 2,
      review_date: '2018/04/27',
      review_text:
        'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.↵↵Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
      value_rating: 2,
    },
  ];

  const wrapper = mount(<ReviewList reviews={reviews} />);

  it('should render without throwing an error', () => {
    expect(wrapper.find('#reviewList').exists()).toBe(true);
  });

  it('should render a Review Component for each index of reviews', () => {
    expect(wrapper.find('.review').length).toEqual(2);
  });
});
