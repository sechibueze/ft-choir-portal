import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import memberReducer from './memberReducer';
import profilesReducer from './profilesReducer';
import adminReducer from './adminReducer';
import postReducer from './postReducer';
import shilohReducer from './shilohReducer';
export default combineReducers({
  auth: authReducer,
  alerts: alertReducer,
  profiles: profilesReducer,
  members: memberReducer,
  admin: adminReducer,
  posts: postReducer,
  shiloh: shilohReducer

});