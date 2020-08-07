import {
  LOAD_MEMBERS,
  GET_MEMBER_PROFILE,
  CLEAR_MEMBER_PROFILE,
  UPDATE_MEMBER_IMAGE,
  DELETE_MEMBER,

  SEND_PASSWORD_RESET_TOKEN,
  RESET_MEMBER_PASSWORD
 
} from '../_actions/types';
const initialState = {
  members: null,
  memberData: null,
  memberImage: null,
  deletedMember: null,
  passwordResetToken: null,
  passwordReset: null

};
export default function (state = initialState, action) {
  const { type, payload} = action;

  switch (type) {
    case LOAD_MEMBERS:
      return {
        ...state,
        members: payload
      };
    case GET_MEMBER_PROFILE:
      return {
        ...state,
        memberData: payload
      };
    case CLEAR_MEMBER_PROFILE:
      return {
        ...state,
        memberData: null
      };
    case UPDATE_MEMBER_IMAGE:
      return {
        ...state,
        memberImage: payload
      };
    case DELETE_MEMBER:
      return {
        ...state,
        deletedMember: payload
      };
    case SEND_PASSWORD_RESET_TOKEN:
      return {
        ...state,
        passwordResetToken: payload
      };
    case RESET_MEMBER_PASSWORD:
      return {
        ...state,
        passwordReset: payload
      };
    
    default:
      return state;
  }
};