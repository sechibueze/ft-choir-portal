import {
  LOAD_MEMBER_PROFILE,
  UPDATE_AUTH_DATA,
  UPDATE_CHURCH_INFO,
  UPDATE_NOK_INFO,
  UPDATE_UNIT_INFO,
  CREATE_MEMBER_PROFILE,
  UPDATE_MEMBER_PROFILE,
  DELETE_PROFILE
} from '../_actions/types';
const initialState = {
  memberProfile: null,
  updatedAuthData: null,
  updatedChurchInfo: null,
  updatedNOKInfo: null,
  updatedUnitInfo: null,
  newProfile: null,
  updatedMemberProfile: null,
  deletedProfile: null

  // createCurrentMemberProfile: null,
  // updatedMemberProfile: null,
  // deleteCurrentMemberProfile: null,
};
export default function (state = initialState, action) {
  const { type, payload} = action;

  switch (type) {
    case LOAD_MEMBER_PROFILE:
      return {
        ...state,
        memberProfile: payload
      };
    case UPDATE_AUTH_DATA:
      return {
        ...state,
        updatedAuthData: payload
      };

    case UPDATE_CHURCH_INFO:
      return {
        ...state,
        updatedChurchInfo: payload
      };
    case UPDATE_NOK_INFO:
      return {
        ...state,
        updatedNOKInfo: payload
      };
    case UPDATE_UNIT_INFO:
      return {
        ...state,
        updatedUnitInfo: payload
      };
   
    case CREATE_MEMBER_PROFILE:
      return {
        ...state,
        newProfile: payload
      };
    case UPDATE_MEMBER_PROFILE:
      return {
        ...state,
        updatedMemberProfile: payload
      };
    case DELETE_PROFILE:
      return {
        ...state,
        deletedProfile: payload
      };
    
    default:
      return state;
  }
};