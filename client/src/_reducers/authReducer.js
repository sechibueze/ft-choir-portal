import {
  LOADING,
  LOADED,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_CURRENT_MEMBER,

  LOGOUT
} from '../_actions/types';
const initialState = {
  token: null,
  isAuthenticated: null,
  currentMember: null,
  loading: false
};
export default function (state = initialState, action) {
  const { type, payload} = action;

  switch (type) {
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload,
        isAuthenticated: true
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        token: null,
        isAuthenticated: null,
        currentMember: null
      };
    case LOAD_CURRENT_MEMBER:
      return {
        ...state,
        currentMember: payload,
        isAuthenticated: true
      };
    case LOADING:
      return {
        ...state,
        loading: true
      };
    case LOADED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};