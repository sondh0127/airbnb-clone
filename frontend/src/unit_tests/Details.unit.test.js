import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Section1 from '../src/Section1.jsx';
import Section2 from '../src/Section2.jsx';
import Section3 from '../src/Section3.jsx';
import Section4 from '../src/Section4.jsx';

it('shallow renders the_space correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Section1 ltr={'TheSpace'} />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});

it('shallow renders Guess Access correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Section2 ltr={'GuestAccess'} />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});

it('shallow renders Interaction With Guests correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Section3 ltr={'InteractionWithGuests'} />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});

it('shallow renders Other Things to Note correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Section4 ltr={'OtherThingsToNote'} />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});
