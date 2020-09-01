import * as types from '../constants/actionTypes';

const initialState = {
  modalOpen: false,
  modalContent: null,
  drawerOpen: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_MODAL_CONTENT:
      return { ...state, modalContent: payload.modalContent };
    case types.TOGGLE_LOGIN_SIGNUP_MODAL:
      const { modalOpen } = state;
      return { ...state, modalOpen: !modalOpen };
    case types.TOGGLE_DRAWER:
      const { drawerOpen } = state;
      return { ...state, drawerOpen: !drawerOpen };
    default:
      return state;
  }
};
