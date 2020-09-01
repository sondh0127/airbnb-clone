import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

export const AuthRoute = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        );
      }}
    />
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthReducer.token != null,
});

export default connect(mapStateToProps)(AuthRoute);
