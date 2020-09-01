import React from 'react';
import { Route, Switch } from 'react-router';
import AuthRoute from '../shared/Auth/AuthRoute';
import NotAuthRoute from '../shared/Auth/NotAuthRoute';

import HomePage from './HomePage/HomePage';
import Signup from './LoginSignup/Signup';
import Login from './LoginSignup/Login';
import Password from './LoginSignup/Password';
import ListingsSearchPage from './ListingsPage/ListingsPage';
import ListingShow from './ListingShow/ListingShow';

import AddListing from './AddListing/AddListing';
import PageSelectStep from './AddListing/PageSelectStep';
import AddListingDuplicate from './AddListing/AddListingDuplicate';
import PageCreateListing from './AddListing/PageCreateListing';
import BookingPage from './BookingPage/BookingPage';

import NotFoundPage from './NotFoundPage';
import withFooter from './Layout/withFooter';

const CREATE_PAGES = ['room', 'bedrooms', 'bathrooms', 'location'];

const UPDATE_PAGES = [
  ...CREATE_PAGES,
  'amenities',
  'spaces',
  'photos',
  'description',
  'title',
  'guest_requirements',
  'house_rules',
  'availability',
  'calendar',
  'price',
];

const RegCreatePage = CREATE_PAGES.join('|');
const RegUpdatePage = UPDATE_PAGES.join('|');

const routes = (
  <Switch>
    <AuthRoute
      path={`/become-a-host/:listingId(\\d+)/:page(${RegUpdatePage})`}
      component={AddListing}
    />
    <AuthRoute exact path="/become-a-host/:listingId(\d+)" component={PageSelectStep} />
    <AuthRoute path={`/become-a-host/:page(${RegCreatePage})`} component={AddListing} />
    <AuthRoute path="/become-a-host/duplicate" component={AddListingDuplicate} />
    <AuthRoute exact path="/become-a-host" component={PageSelectStep} />
    <AuthRoute path="/bookings" exact component={BookingPage} />
    <Route exact path="/listings" component={ListingsSearchPage} />
    <Route path="/listings/:listingsId(\d+)" component={ListingShow} />
    <NotAuthRoute path="/password" component={withFooter(Password)} />
    <NotAuthRoute path="/login" component={withFooter(Login)} />
    <NotAuthRoute path="/signup" component={withFooter(Signup)} />
    <Route exact path="/" component={HomePage} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default routes;
