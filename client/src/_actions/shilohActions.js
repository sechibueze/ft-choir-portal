import axios from 'axios';
import {
  LOADING,
  LOADED,
  baseURL,
  GET_SHILOH_ATTENDANCE_LIST,
  GET_SHILOH_DATA,
  SHILOH_SIGNUP,
  UPDATE_SHILOH_DATA,
  DELETE_SHILOH_DATA,
  RESET_SHILOH_DATA,
  GENERATE_SHILOH_ATTENDANCE_REPORT,

} from '../_actions/types';
import { setAlert } from './alertActions';
import { getRequestConfig } from './authActions';



export const registerForShiloh = data => dispatch => {
    const url = `${ baseURL }/api/shiloh/register`;
    const requestConfig = getRequestConfig("POST", data);
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        response.json().then(errorResponse => {                 
          errorResponse.errors.map(errorText => dispatch(setAlert(errorText, SHILOH_SIGNUP)) )
        })       
      })
      .then(data => {
        if (data) {         
          dispatch({
            type: SHILOH_SIGNUP,
            payload: data.data
          });        
          dispatch({ type: LOADED })
        }
      })
      .catch(err => {       
        setAlert('Network error, please try again later', SHILOH_SIGNUP);
        dispatch({ type: LOADED })
      })
}

export const getShilohRegistrationById = (id) => dispatch => {
    dispatch({ type: LOADING })
    const url = `${ baseURL }/api/shiloh/attendees/${ id }`;
    const requestConfig = getRequestConfig();
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        response.json().then(errorResponse => { 
                         
          errorResponse.errors.map(errorText => dispatch(setAlert(errorText, GET_SHILOH_DATA)) )
          dispatch({ type: LOADED })
        })       
      })
      .then(data => {
        if (data) {         
          dispatch({
            type: GET_SHILOH_DATA,
            payload: data.data
          });
          dispatch(setAlert(data.message, GET_SHILOH_DATA, 'success'));        
          dispatch({ type: LOADED })
        }
      })
      .catch(err => {       
        setAlert('Network error, please try again later', GET_SHILOH_DATA);
        dispatch({ type: LOADED })
      })
}

export const updateShilohRegistrationById = (shilohData) => dispatch => {
    dispatch({ type: LOADING })
    const url = `${ baseURL }/api/shiloh/attendees/${ shilohData.id }`;
    const requestConfig = getRequestConfig("PUT", shilohData);
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        response.json().then(errorResponse => { 
                         
          errorResponse.errors.map(errorText => dispatch(setAlert(errorText, UPDATE_SHILOH_DATA)) )
          dispatch({ type: LOADED })
        })       
      })
      .then(data => {
        if (data) {         
          dispatch({
            type: UPDATE_SHILOH_DATA,
            payload: data.data
          });
          dispatch(setAlert(data.message, UPDATE_SHILOH_DATA, 'success'));        
          dispatch({ type: LOADED })
        }
      })
      .catch(err => {       
        setAlert('Network error, please try again later', UPDATE_SHILOH_DATA);
        dispatch({ type: LOADED })
      })
}

export const getShilohRegistration = () => dispatch => {
    dispatch({ type: LOADING });
    const url = `${ baseURL }/api/shiloh/attendees`;
    const requestConfig = getRequestConfig();
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        response.json().then(errorResponse => {                 
          errorResponse.errors.map(errorText => dispatch(setAlert(errorText, GET_SHILOH_ATTENDANCE_LIST)));
          dispatch({ type: LOADED });
        })       
      })
      .then(data => {
        if (data) {         
          dispatch({
            type: GET_SHILOH_ATTENDANCE_LIST,
            payload: data.data
          });        
          dispatch({ type: LOADED })
        }
      })
      .catch(err => {       
        dispatch(setAlert('Network error, please try again later', GET_SHILOH_ATTENDANCE_LIST));
        dispatch({ type: LOADED })
      })
}
export const resetShilohDaata = () => dispatch => {
    dispatch({type: RESET_SHILOH_DATA});
}
export const generateShilohRegistrationReport = () => dispatch => {
    const url = `${ baseURL }/api/shiloh/report`;
    const requestConfig = getRequestConfig("GET");
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        response.json().then(errorResponse => {                 
          dispatch(setAlert(errorResponse.error, GENERATE_SHILOH_ATTENDANCE_REPORT)) 
        })       
      })
      .then(data => {
        if (data) {         
          dispatch({
            type: GENERATE_SHILOH_ATTENDANCE_REPORT,
            payload: data.data
          });        
          dispatch({ type: LOADED })
        }
      })
      .catch(err => {       
        setAlert('Network error, please try again later', GENERATE_SHILOH_ATTENDANCE_REPORT);
        dispatch({ type: LOADED })
      })
}
export const deleteShilohRegistrationById = id => dispatch => {
    const url = `${ baseURL }/api/shiloh/attendees/${ id }`;
    const requestConfig = getRequestConfig("DELETE");
    fetch(url, requestConfig)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        // Response is outsie 2xx range
        response.json().then(errorResponse => {                 
          errorResponse.errors.map(errorText => setAlert(errorText, DELETE_SHILOH_DATA) )
        })       
      })
      .then(data => {
        if (data) {         
          dispatch({
            type: DELETE_SHILOH_DATA,
            payload: data.data
          });        
          dispatch({ type: LOADED })
        }
      })
      .catch(err => {       
        setAlert('Network error, please try again later', DELETE_SHILOH_DATA);
        dispatch({ type: LOADED })
      })
}

