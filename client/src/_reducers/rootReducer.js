import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import memberReducer from './memberReducer';
import profilesReducer from './profilesReducer';
import adminReducer from './adminReducer';
export default combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  profiles: profilesReducer,
  members: memberReducer,
  admin: adminReducer

});