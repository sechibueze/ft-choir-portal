import axios from 'axios';
import {
  LOADING,
  LOADED,
  SIGNUP_SUCCESS,
  // SIGNUP_FAIL,
  LOGIN_SUCCESS,
  // LOGIN_FAIL,
  LOAD_CURRENT_MEMBER,
  // SET_ALERT,
  LOGOUT
} from './types';
import { handleResponseErrors } from './alertActions';

export const getConfigHeaders = ( type = 'application/json') => {
  let configHeaders = {
    headers: {
      "Content-Type": type
    }
  }
  const token = localStorage.getItem('token');
  if (token) {
    configHeaders.headers['x-auth-token'] = token;
  }
  return configHeaders;

};

export const getAccessToken = ( type = 'application/json') => {
  let configHeaders = {
    headers: {
      "Content-Type": type
    }
  }
  const access = localStorage.getItem('access');
  if (access) {
    configHeaders.headers['x-auth-access'] = access;
  }
  return configHeaders;

}

export const loadCurrentMember = () => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.get('/api/members/auth', configHeaders)
    .then(({ data }) => {
      console.log('Data ', data)
      dispatch({ type: LOAD_CURRENT_MEMBER, payload: data.data });
    })
    .catch(err => {
      console.log('Err ', err)
      dispatch(handleResponseErrors(err, 'AUTH'));
    });
};

export const registerMember = memberData => dispatch => {
  dispatch({ type: LOADING });

  axios.post('/api/members', memberData)
    .then(({ data }) => {
      console.log('Data ', data)
      localStorage.setItem('token', data.token);

      dispatch(loadCurrentMember());

      dispatch({ type: SIGNUP_SUCCESS, payload: data.token });
    })
    .catch(err => {
      console.log('Err ', err)
      dispatch(handleResponseErrors(err, 'SIGNUP'));
      dispatch({ type: LOADED });
    });
};

export const loginMember = memberLogin => dispatch => {
  dispatch({ type: LOADING });

  axios.post('/api/members/login', memberLogin)
    .then(({ data }) => {
      console.log('Data ', data)
      localStorage.setItem('token', data.token);

      dispatch(loadCurrentMember());

      dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    })
    .catch(err => {
      console.log('Err ', err)
      dispatch(handleResponseErrors(err, 'LOGIN'));
      dispatch({ type: LOADED });
    });
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};