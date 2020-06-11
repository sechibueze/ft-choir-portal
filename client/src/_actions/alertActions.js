import { v4 } from 'uuid';
import { SET_ALERT, LOADED, CLEAR_ALERT } from './types';


export const setAlert = (alertText, origin = 'AUTH',  timeout = 3000) => dispatch => {
  const alertId = v4();
  dispatch({
    type: SET_ALERT,
    payload: { alertText, alertId, origin }
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

export const handleResponseErrors = (err, origin = 'AUTH') => dispatch => {
  console.log('err', err.toString())
  if (err.response && err.response.status === 422) {
    err.response.data.errors.map(e => (
      dispatch({
        type: SET_ALERT,
        payload: {
          alertId: v4(),
          alertText: e,
          origin: origin
        }
      })
    ))
  }

  if (err.response && err.response.status !== 422 && err.response.data) {
    dispatch({
      type: SET_ALERT,
      payload: {
        alertId: v4(),
        alertText: err.response.data.error,
        origin
      }
    })
  }
};