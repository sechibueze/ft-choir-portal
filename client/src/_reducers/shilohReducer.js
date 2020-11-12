import { 
  SHILOH_SIGNUP,
  UPDATE_SHILOH_DATA,
  GET_SHILOH_DATA,
  DELETE_SHILOH_DATA,
  GET_SHILOH_ATTENDANCE_LIST,
  GENERATE_SHILOH_ATTENDANCE_REPORT,
  RESET_SHILOH_DATA
 } from '../_actions/types';
const initialState = {
  shilohReportUrl: null,
  newAttendee: null,
  updatedAttendee: null,
  shilohData: null,
  shilohList: []
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SHILOH_SIGNUP:
      return {
        ...state,
        newAttendee: payload
      }
    case UPDATE_SHILOH_DATA:
    case DELETE_SHILOH_DATA:
      return {
        ...state,
        updatedAttendee: payload
      }
    case RESET_SHILOH_DATA:

      return {
        ...state,
        newAttendee: null,
        updatedAttendee: null,
      }
    case GET_SHILOH_DATA:
      return {
        ...state,
        shilohData: payload
      }
    case GET_SHILOH_ATTENDANCE_LIST:
      return {
        ...state,
        shilohList: payload
      }
    case GENERATE_SHILOH_ATTENDANCE_REPORT:
      return {
        ...state,
        shilohReportUrl: payload
      }
    
    default:
      return state;
  }
}