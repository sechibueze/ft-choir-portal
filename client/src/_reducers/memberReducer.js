import {
  LOAD_MEMBERS,
  GET_MEMBER_PROFILE,
  UPDATE_MEMBER_IMAGE,
  DELETE_MEMBER
 
} from '../_actions/types';
const initialState = {
  members: null,
  memberData: null,
  memberImage: null,
  deletedMember: null
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
    
    default:
      return state;
  }
};