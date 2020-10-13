import {
  LOGIN_START,
  LOGIN_SUCCESS,
  GET_INFO_START,
  GET_INFO_SUCCESS,
  GET_INFO_FAILURE,
  LOGIN_FAILURE,
  CLEAR_ADMIN_SESSION
} from './admin.types';

export const loginStart = usernameAndPassword => ({
  type: LOGIN_START,
  payload: usernameAndPassword
});

export const getInfoStart = token => ({
  type: GET_INFO_START,
  payload: token
});
export const getInfoSuccess = info => ({
  type: GET_INFO_SUCCESS,
  payload: info
});

export const loginSuccess = user => ({
  type: LOGIN_SUCCESS,
  payload: user
});
export const getInfoFailure = error => ({
  type: GET_INFO_FAILURE,
  payload: error
});

export const loginFailure = error => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const clearAdminSession = () => ({
  type: CLEAR_ADMIN_SESSION
});
