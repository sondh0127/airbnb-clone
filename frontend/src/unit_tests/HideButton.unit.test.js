import React from 'react';
import { shallow } from 'enzyme';
import HideButton from '../src/HideButton.jsx';

test('HideButton changes the text after click', () => {
  // Not sure if I need to add these in
  //style={ButtonInLineStyle} hideOverview={this.hideOverview}
  //isolates the helper function...test the click separately.
  //just make sure that the click handler is invoking the callback it needs to
  const hidebutton = shallow(<HideButton />);

  expect(hidebutton.text()).toEqual('Read more about the space');
  hidebutton.find('span').simulate('click');
  expect(hidebutton.text()).toEqual('Hide');
});
