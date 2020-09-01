import * as types from '../constants/actionTypes';

const initialState = () => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const expirationDate = localStorage.getItem('expirationDate');
  return {
    token: token,
    userId: userId, // using email for login
    expirationDate: expirationDate,
    error: null, // response message
    loading: false,
    authRedirectPath: '/',
  };
};

export default (state = initialState(), { type, payload }) => {
  switch (type) {
    case types.AUTH_REQUEST:
      return { ...state, loading: true, error: null };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        token: payload.token,
        userId: payload.userId,
        expirationDate: payload.expirationDate,
        loading: false,
        error: null,
      };
    case types.AUTH_FAIL:
      const error = payload.error || { message: payload.message };
      //2nd one is network or server down errors
      return {
        ...state,
        loading: false,
        error: error,
      };
    case types.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        expirationDate: '',
      };
    case types.RESET_TOKEN:
      return {
        ...state,
        userId: null,
        token: null,
        expirationDate: '',
        loading: false,
      };
    default:
      return state;
  }
};
