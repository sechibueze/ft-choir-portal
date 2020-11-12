import { v4 } from 'uuid';
import { SET_ALERT, LOADED, CLEAR_ALERT } from './types';


export const setAlert = (alertText, origin = 'AUTH', type="danger",  timeout = 3000) => dispatch => {
  const alertId = v4();
  
  dispatch({
    type: SET_ALERT,
    payload: { alertText, alertId, origin, type }
  });
  dispatch({ type: LOADED})

  setTimeout(() => (dispatch({
    type: CLEAR_ALERT,
    payload: alertId
  })), timeout)
}

export const clearAlert = (alertId = null) => dispatch => {
  dispatch({
    type: CLEAR_ALERT,
    payload: alertId
  });
};

export const handleResponseErrors = (err, origin = 'AUTH', type = "danger") => dispatch => {
  if (err.response) {
      if (err.response.status === 422) {
        err.response.data.errors.map(e => (
          dispatch({
            type: SET_ALERT,
            payload: {
              alertId: v4(),
              alertText: e,
              origin, 
              type
            }
          })
        ))
      } else {
        dispatch({
          type: SET_ALERT,
          payload: {
            alertId: v4(),
            alertText: typeof err.response.data === 'object' ? err.response.data.error : err.response.data,
            origin,
            type
          }
        })

      }
    } else if ( err.request) {
      dispatch({
            type: SET_ALERT,
            payload: {
              alertId: v4(),
              alertText: err.request.responseText,
              origin, 
              type
            }
          })      
    }else{
      
      dispatch({
            type: SET_ALERT,
            payload: {
              alertId: v4(),
              alertText: err.message || err.toString(),
              origin, 
              type
            }
          })
    }   
    dispatch({type: LOADED })
    
};