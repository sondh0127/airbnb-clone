import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';

import Header from './Header/Header';
import WrappedModal from './LoginSignup/WrappedModal';
import HelpDrawer from './Header/NavLink/HelpDrawer';
// import Footer from './Footer';

import { authCheckState } from '../store/actions/AuthActions';

import routes from './routes';

const App = ({ authCheckState, location }) => {
  useEffect(() => {
    authCheckState();
  }, []);
  const showHeader = !location.pathname.includes('/become-a-host');
  const isHome = location.pathname === '/';
  return (
    <>
      {showHeader && <Header />}
      <main>
        {showHeader && !isHome && (
          <div style={{ height: 81, backgroundColor: 'transparent' }} />
        )}
        <Switch>{routes}</Switch>
      </main>
      <WrappedModal />
      <HelpDrawer />
      {/* <Footer /> */}
    </>
  );
};
const mapDispatchToProps = {
  authCheckState,
};

export default connect(
  null,
  mapDispatchToProps
)(App);

App.propTypes = {
  authCheckState: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
