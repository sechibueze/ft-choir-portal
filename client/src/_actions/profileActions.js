import axios from 'axios';
import {
  LOADING,
  LOAD_MEMBER_PROFILE,
  UPDATE_AUTH_DATA,
  UPDATE_CHURCH_INFO,
  UPDATE_UNIT_INFO,
  UPDATE_NOK_INFO,
  CREATE_MEMBER_PROFILE,
  UPDATE_MEMBER_PROFILE,
  DELETE_PROFILE,
  LOADED
} from '../_actions/types';

import { handleResponseErrors, setAlert } from './alertActions';
import { getConfigHeaders } from './authActions';

export const loadMemberProfile = () => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.get('/api/profiles/me', configHeaders)
    .then(({ data }) => {
      // console.log('Currently logged in member profile ', data)
      dispatch({ type: LOAD_MEMBER_PROFILE, payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      // console.log('Error in loading currently logged in member profile ', err)
      dispatch(handleResponseErrors(err, 'PROFILE'));
    });
};


export const updateAuthData = authData => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.put('/api/members', authData, configHeaders)
    .then(({ data }) => {
      console.log('UDATEED member profile ', data)
      dispatch({ type: UPDATE_AUTH_DATA, payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Error in loading currently logged in member profile ', err)
      dispatch(handleResponseErrors(err, 'AUTH_DATA_UPDATE'));
    });
};

export const updateChurchInfo = churchInfo => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.put('/api/profiles/churchinfo', churchInfo, configHeaders)
    .then(({ data }) => {
      console.log('UDATEED member profile ', data)
      dispatch({ type: UPDATE_CHURCH_INFO, payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Error in loading currently logged in member profile ', err)
      dispatch(handleResponseErrors(err, 'CHURCH_INFO_UPDATE'));
    });
};

export const updateNOKInfo = nokInfo => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.put('/api/profiles/nok', nokInfo, configHeaders)
    .then(({ data }) => {
      console.log('UDATEED NOK profile ', data)
      dispatch({ type: UPDATE_NOK_INFO, payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Error in updating NOK profile ', err)
      dispatch(handleResponseErrors(err, 'NOK_INFO_UPDATE'));
    });
};
export const updateUnitInfo = unitInfo => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.put('/api/profiles/unitinfo', unitInfo, configHeaders)
    .then(({ data }) => {
      console.log('UDATEED UNIT profile ', data)
      dispatch({ type: UPDATE_UNIT_INFO, payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Error in updating UNiT profile ', err)
      dispatch(handleResponseErrors(err, 'UNIT_INFO_UPDATE'));
    });
};

// Create and Update
export const updateMemberProfile = (profileData, update=true) => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.post('/api/profiles', profileData, configHeaders)
    .then(({ data }) => {
      // console.log('updateMemberProfile Data ', data)
      dispatch({ type: update ?  UPDATE_MEMBER_PROFILE : CREATE_MEMBER_PROFILE , payload: data.data });
      dispatch({ type: LOADED });
    })
    .catch(err => {
      console.log('Err ', err)
      dispatch(handleResponseErrors(err, 'PROFILE_ERROR'));
    });
};

// Delete profile
// DELETE /api/profiles/me
export const deleteProfile = (memberId) => dispatch => {
  dispatch({ type: LOADING });
  const configHeaders = getConfigHeaders();
  axios.delete(`/api/profiles/${ memberId }`, configHeaders)
    .then(({ data }) => {
      dispatch({ type: DELETE_PROFILE , payload: data.data });
      dispatch(setAlert("Profile deleted", "DELETE_PROFILE_OK", "success"));
      dispatch({ type: LOADED });
    })
    .catch(err => {
      dispatch(handleResponseErrors(err, 'PROFILE_DELETE'));
    });
};

