import axios from 'axios';
import {
  LOADING,
  LOADED,
  LOAD_MEMBERS,
  GET_MEMBER_PROFILE,
  UPDATE_MEMBER_IMAGE,
  DELETE_MEMBER
} from '../_actions/types';
import { handleResponseErrors } from './alertActions';
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

export const updateMemberImage = imageData => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders('multipart/form-data');
  axios.put('/api/members/image', imageData, configHeaders)
    .then(({ data }) => {
      console.log('Currently logged in member profile ', data)
      dispatch({ type: UPDATE_MEMBER_IMAGE, payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Error in loading currently logged in member profile ', err)
      dispatch(handleResponseErrors(err, 'MEMBER_IMAGE'));
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


