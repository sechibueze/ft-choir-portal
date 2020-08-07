import axios from 'axios';
import {
  LOADING,
  LOADED,
  TOGGLE_ADMIN_AUTH,
  GENERATE_REPORT,
  BECOME_ADMIN,
  FLUSH_DATA
} from '../_actions/types';
import { handleResponseErrors, setAlert } from './alertActions';
import { getConfigHeaders } from './authActions';

export const generateProfileReport = () => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.get('/api/reports/profiles', configHeaders)
    .then(({ data }) => {
      console.log('Loaded reporsts ', data)
      dispatch({ type: GENERATE_REPORT, payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Error iin loading members', err)
      dispatch(handleResponseErrors(err, 'REPORTS'));
    });
};

export const toggleAdminAuth = (memberId) => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  // localhost:5000/api/members/5edf630a39296e1c04031e5b/admin
  axios.put(`/api/members/${ memberId}/admin`, null, configHeaders)
    .then(({ data }) => {
      console.log('Loaded admin auth ', data)
      dispatch({ type: TOGGLE_ADMIN_AUTH, payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Error iin loading members', err)
      dispatch(handleResponseErrors(err, 'TOGGLE_ADMIN'));
    });
}

export const becomeAdmin = (access) => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  // localhost:5000/api/members/5edf630a39296e1c04031e5b/admin
  axios.put(`/api/members/admin`, access, configHeaders)
    .then(({ data }) => {
      console.log('Loaded admin auth ', data)
      dispatch({ type: BECOME_ADMIN, payload: data.data });
      dispatch(setAlert('User Authorization updated', 'BECOME_ADMIN'));
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Error iin loading members', err)
      dispatch(handleResponseErrors(err, 'BECOME_ADMIN'));
    });
}
export const flushAllData = () => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  
  axios.delete(`/api/members/all/flush`,  configHeaders)
    .then(({ data }) => {
      console.log('Loaded admin auth ', data)
      dispatch({ type: FLUSH_DATA, payload: data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Error iin loading members', err)
      dispatch(handleResponseErrors(err, 'FLUSH_DATA'));
    });
}