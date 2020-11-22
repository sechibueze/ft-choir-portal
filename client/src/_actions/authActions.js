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
  LOGOUT,
  GET_ACCESS,
  UPLOAD_ACCESS,
  ADD_ACCESS,
  RESET_ACCESS_DATA,
  DELETE_ACCESS,
  FLUSH_ACCESS_LIST,
} from './types';
import { handleResponseErrors } from './alertActions';

export const getRequestConfig = (method="GET", body = null ) => {
  let requestConfig = {
      method: method,
      headers: {
        'Content-Type':'application/json'
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      requestConfig.headers['x-auth-token'] = token;
    }
    if(body){
      requestConfig["body"] = JSON.stringify(body)
    }
    return requestConfig;
};

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
      dispatch(handleResponseErrors(err, 'LOGIN'));
      dispatch({ type: LOADED });
    });
};

export const verifyAccessId = (accessId, history) => dispatch => {
  dispatch({ type: LOADING });

  axios.post('/api/allowlist/verify', accessId)
    .then(({ data }) => {

      if (history) history.push(`/signup/${data.data.id}`);
    })
    .catch(err => {

      dispatch(handleResponseErrors(err, 'VERIFY_ACCESS_ID'));
      dispatch({ type: LOADED });
    });
};

export const getAccessList = () => dispatch => {
  dispatch({ type: LOADING });

  axios.get('/api/allowlist')
    .then(({ data }) => {

      dispatch({
        type: GET_ACCESS,
        payload: data.data
      })
    })
    .catch(err => {

      dispatch(handleResponseErrors(err, 'GET_ACCESS_LIST'));
      dispatch({ type: LOADED });
    });
};

export const uploadAccessList = (fd) => dispatch => {
  dispatch({ type: LOADING });

  const config = getConfigHeaders('multipart/form-data');

  axios.post('/api/allowlist', fd, config)
    .then(({ data }) => {
      dispatch({
        type: UPLOAD_ACCESS,
        payload: data.data
      })
    })
    .catch(err => {

      dispatch(handleResponseErrors(err, 'UPLOAD_ACCESS_LIST'));
      dispatch({ type: LOADED });
    });
};

export const flushAccessList = () => dispatch => {
  dispatch({ type: LOADING });

  const config = getConfigHeaders();

  axios.delete('/api/allowlist', config)
    .then(({ data }) => {
      dispatch({
        type: FLUSH_ACCESS_LIST ,
        payload: data.data
      })
    })
    .catch(err => {

      dispatch(handleResponseErrors(err, 'FLUSH_ACCESS_LIST'));
      dispatch({ type: LOADED });
    });
};

export const addAccess = accessData => dispatch => {
  dispatch({ type: LOADING });

  const config = getConfigHeaders();

  axios.put(`/api/allowlist`, accessData, config)
    .then(({ data }) => {
      dispatch({
        type: ADD_ACCESS ,
        payload: data.data
      })
    })
    .catch(err => {

      dispatch(handleResponseErrors(err, 'ADD_ACCESS'));
      dispatch({ type: LOADED });
    });
};
export const deleteAccessById = id => dispatch => {
  dispatch({ type: LOADING });

  const config = getConfigHeaders();

  axios.delete(`/api/allowlist/${ id }`, config)
    .then(({ data }) => {
      dispatch({
        type: DELETE_ACCESS ,
        payload: data.data
      })
    })
    .catch(err => {

      dispatch(handleResponseErrors(err, 'DELETE_ACCESS'));
      dispatch({ type: LOADED });
    });
};

export const resetAccessData = () => dispatch => {
  dispatch({ type: RESET_ACCESS_DATA });
};
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};