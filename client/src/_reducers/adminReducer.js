import { 

  TOGGLE_ADMIN_AUTH,
  GENERATE_REPORT,
  BECOME_ADMIN,
  FLUSH_DATA
 } from '../_actions/types';
const initialState = {
  reportUrl: null,
  adminAuth: null,
  hasBecomeAdmin: null,
  flushData: null
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GENERATE_REPORT:
      return {
        ...state,
        reportUrl: payload
      }
    case TOGGLE_ADMIN_AUTH:
      return {
        ...state,
        adminAuth: payload
      }
    case BECOME_ADMIN:
      return {
        ...state,
        hasBecomeAdmin: payload
      }
    case FLUSH_DATA:
      return {
        ...state,
        flushData: payload
      }
    
    default:
      return state;
  }
}