import PropTypes from 'prop-types';
import React from 'react';
import { S } from '../styled';
import MenuDropDown from './MenuDropDown';
import {
  handleOpenModal,
  MODAL_CONTENT,
  toggleDrawer,
} from '../../../store/actions/NavActions';

import { connect } from 'react-redux';

const NavItem = ({ children }) => (
  <S.LiCell>
    <S.LiContent>{children}</S.LiContent>
  </S.LiCell>
);

const NavLink = ({ isAuthenticated, isHome, toggleDrawer, handleOpenModal }) => {
  return (
    <nav>
      <S.UlTable transparent={isHome}>
        {isAuthenticated && (
          <>
            <NavItem>
              <S.StyledLink to="/become-a-host/duplicate">
                <S.LinkContent transparent={isHome}>
                  <S.LinkText>Add listing</S.LinkText>
                </S.LinkContent>
              </S.StyledLink>
            </NavItem>
            <NavItem>
              <S.StyledLink to="/bookings">
                <S.LinkContent transparent={isHome}>
                  <S.LinkText>Trips</S.LinkText>
                </S.LinkContent>
              </S.StyledLink>
            </NavItem>
          </>
        )}
        <NavItem>
          <S.LinkContent transparent={isHome} onClick={toggleDrawer}>
            <S.LinkText>Help</S.LinkText>
          </S.LinkContent>
        </NavItem>
        {!isAuthenticated && (
          <>
            <NavItem>
              <S.LinkContent
                transparent={isHome}
                onClick={() => handleOpenModal(MODAL_CONTENT.SIGN_UP)}
              >
                <S.LinkText>Sign Up</S.LinkText>
              </S.LinkContent>
            </NavItem>
            <NavItem>
              <S.LinkContent
                transparent={isHome}
                onClick={() => handleOpenModal(MODAL_CONTENT.LOGIN)}
              >
                <S.LinkText>Log in</S.LinkText>
              </S.LinkContent>
            </NavItem>
          </>
        )}
        {isAuthenticated && (
          <S.LiCell>
            <MenuDropDown />
          </S.LiCell>
        )}
      </S.UlTable>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.AuthReducer.token != null,
});

const mapDispatchToProps = {
  toggleDrawer,
  handleOpenModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavLink);

NavLink.propTypes = {
  isHome: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};
