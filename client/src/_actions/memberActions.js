import axios from 'axios';
import {
  LOADING,
  LOADED,
  LOAD_MEMBERS,
  GET_MEMBER_PROFILE,
  CLEAR_MEMBER_PROFILE,
  UPDATE_MEMBER_IMAGE,
  DELETE_MEMBER,

  SEND_PASSWORD_RESET_TOKEN,
  RESET_MEMBER_PASSWORD
} from '../_actions/types';
import { handleResponseErrors, setAlert } from './alertActions';
import { getConfigHeaders } from './authActions';

export const loadMembers = () => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.get('/api/members', configHeaders)
    .then(({ data }) => {
      console.log('Loaded members ', data)
      dispatch({ type: LOAD_MEMBERS, payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Error iin loading members', err)
      dispatch(handleResponseErrors(err, 'MEMBER'));
    });
};


export const loadProfileByMemberId = memberId => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  // localhost:5000/api/profiles/members/5edcbc05c66bd7109c75f07d/
  axios.get(`/api/profiles/members/${memberId}`, configHeaders)
    .then(({ data }) => {
      console.log('Loaded members ', data)
      dispatch({ type: GET_MEMBER_PROFILE, payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Error iin loading members', err)
      dispatch(handleResponseErrors(err, 'PROFILE'));
    });
};
export const clearMemberProfile = () => dispatch => {
  dispatch({ type: CLEAR_MEMBER_PROFILE });
};

export const updateMemberImage = imageData => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders('multipart/form-data');
  axios.put('/api/members/image', imageData, configHeaders)
    .then(({ data }) => {
      dispatch({ type: UPDATE_MEMBER_IMAGE, payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, 'MEMBER_IMAGE'));
    });
};

export const sendPasswordResetToken = data => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  // localhost:5000/api/members/forgotpassword
  axios.put(`/api/members/forgotpassword`, data,  configHeaders)
    .then(({ data }) => {
      // console.log('Loaded members ', data)
      dispatch({ type: SEND_PASSWORD_RESET_TOKEN, payload: data });
      dispatch(setAlert(data.message, SEND_PASSWORD_RESET_TOKEN, 'success', 40000))
      dispatch({ type: LOADED });
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, 'SEND_PASSWORD_RESET_TOKEN'));
    });
};



export const resetMemberPassword = (data, history = '') => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  // localhost:5000/api/members/forgotpassword
  axios.put(`/api/members/resetpassword`, data,  configHeaders)
    .then(({ data }) => {
      dispatch({ type: RESET_MEMBER_PASSWORD, payload: data });
      dispatch(setAlert(data.message, RESET_MEMBER_PASSWORD, 'success', 40000))
      dispatch({ type: LOADED });

      if (history) {
        history.push('/login')
      }
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, 'RESET_MEMBER_PASSWORD'));
    });
};


export const deleteMemberById = memberId => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.delete(`/api/members/${ memberId}`, configHeaders)
    .then(({ data }) => {
      console.log('Currently logged in member profile ', data)
      dispatch({ type: DELETE_MEMBER, payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Error in loading currently logged in member profile ', err)
      dispatch(handleResponseErrors(err, 'DELETE_MEMBER'));
    });
};


