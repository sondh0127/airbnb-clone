import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Summary from '../src/Summary.jsx';

const request = require('supertest');
const app = require('../server/app');

describe('Test the summary path', () => {
  test('It should return a field called "noOfBedrooms" with data', (done) => {
    request(app)
      .get('/overview/listingId/1')
      .then((response) => {
        expect(response.body[0].noOfBedrooms.length).toBeGreaterThan(0);
        done();
      });
  });

  test('It should return a field called "noOfBeds" with data', (done) => {
    request(app)
      .get('/overview/listingId/1')
      .then((response) => {
        expect(response.body[0].noOfBeds.length).toBeGreaterThan(0);
        done();
      });
  });

  test('It should return a field called "noOfBaths" with data', (done) => {
    request(app)
      .get('/overview/listingId/1')
      .then((response) => {
        expect(response.body[0].noOfBaths.length).toBeGreaterThan(0);
        done();
      });
  });

  test('It should return a field called "noOfGuests" with data', (done) => {
    request(app)
      .get('/overview/listingId/1')
      .then((response) => {
        expect(response.body[0].noOfGuests.length).toBeGreaterThan(0);
        done();
      });
  });
});

it('shallow renders Summary bedrooms correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Summary />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});

it('shallow renders Summary beds correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Summary />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});

it('shallow renders Summary bathrooms correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Summary />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});

it('shallow renders Summary guests correctly', () => {
  const renderer = new ShallowRenderer();
  renderer.render(<Summary />);
  const tree = renderer.getRenderOutput();
  expect(tree).toMatchSnapshot();
});
