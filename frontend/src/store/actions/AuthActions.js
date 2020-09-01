import axios from '../axios';
import * as types from '../constants/actionTypes';
import { toggleLoginSignupModal } from './NavActions';
import moment from 'moment';

const getTimeToNow = (time) => moment(time).unix() - moment().unix();

export const isAuthenticated = () => {
  return (dispatch, getState) => {
    const { token, expirationDate } = getState().AuthReducer;
    const isValid = getTimeToNow(expirationDate) <= 0;
    return !!(token && isValid);
  };
};

export const authRequest = () => {
  return {
    type: types.AUTH_REQUEST,
  };
};

export const authFailure = (error) => {
  return {
    type: types.AUTH_FAIL,
    payload: {
      error,
    },
  };
};

// const dumpUser = {
//   email: 'email1@gmail.com',
//   firstname: 'firstname1',
//   lastname: 'lastname1',
//   password: 'password',
//   birthday: '27/10/1996',
// };

export const registerUser = (email, firstname, lastname, password, birthday) => {
  return async (dispatch) => {
    dispatch(authRequest());
    try {
      let res = await axios.post(`/users`, {
        email,
        firstname,
        lastname,
        password,
        birthday,
      });
      const { data, config } = res;
      console.log('data', data);
      if (data.id) {
        dispatch(loginUser(email, password, false));
      }
    } catch ({ response }) {
      let error = 'Something went wrong.';
      if (response.status === 400) {
        error = 'User with that email already exists.';
      } else {
      }
      dispatch(authFailure(error));
    }
  };
};

export const authSuccess = (token, userId, expirationDate) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('expirationDate', expirationDate);

  return {
    type: types.AUTH_SUCCESS,
    payload: {
      token,
      expirationDate,
      userId,
    },
  };
};

const dumpLogin = {
  email: 'email1@gmail.com',
  password: 'password',
};

export const loginUser = (email, password, rememberMe) => {
  return async (dispatch, getState) => {
    const modalOpen = getState().NavReducer.modalOpen;
    dispatch(authRequest());
    try {
      let res = await axios.post('/tokens', null, {
        auth: {
          username: email,
          password: password,
        },
      });
      const { data } = res;
      const expirationTime = getTimeToNow(data.expire);

      dispatch(authSuccess(data.token, data.user_id, data.expire));

      dispatch(checkAuthTimeout(expirationTime));
      if (modalOpen) {
        dispatch(toggleLoginSignupModal());
      }
    } catch ({ response }) {
      let error = 'Something went wrong.';
      dispatch(authFailure(error));
    }
  };
};

export const demoLogin = () => {
  return async (dispatch) => {
    dispatch(loginUser(dumpLogin.email, dumpLogin.password, true));
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch(authRequest());
    try {
      dispatch(logOut());
      let res = await axios.delete('/tokens');
      if (res.status === 204) {
      } else {
        throw new Error('ERROR');
      }
    } catch ({ response }) {
      let error = 'Something went wrong.';
      dispatch(authFailure(error));
    }
  };
};

export const logOut = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: types.AUTH_LOGOUT,
  };
};
export const authCheckState = () => {
  return (dispatch, getState) => {
    const { expirationDate, token } = getState().AuthReducer;
    if (token) {
      const expirationTime = getTimeToNow(expirationDate);

      if (!isAuthenticated()) {
        dispatch(logOut());
      } else {
        dispatch(checkAuthTimeout(expirationTime));
      }
    }
  };
};

export const resetToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  //remove token from storage
  return {
    type: types.RESET_TOKEN,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logOutUser());
    }, expirationTime * 1000);
  };
};
