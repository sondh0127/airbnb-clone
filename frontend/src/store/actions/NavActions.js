import * as types from '../constants/actionTypes';

export const MODAL_CONTENT = {
  SIGN_UP: 'SIGN_UP',
  LOGIN: 'LOGIN',
  PASSWORD: 'PASSWORD',
};

export const setModalContent = (modalContent) => ({
  type: types.SET_MODAL_CONTENT,
  payload: { modalContent },
});

export const toggleLoginSignupModal = () => ({
  type: types.TOGGLE_LOGIN_SIGNUP_MODAL,
});

export const toggleDrawer = () => ({
  type: types.TOGGLE_DRAWER,
});

export const handleOpenModal = (modalContent) => {
  return (dispatch) => {
    dispatch(toggleLoginSignupModal());
    dispatch(setModalContent(modalContent));
  };
};
