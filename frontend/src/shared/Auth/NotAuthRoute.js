import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const NotAuthRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/listings' }} />
        );
      }}
    />
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthReducer.token != null,
});

export default connect(mapStateToProps)(NotAuthRoute);
