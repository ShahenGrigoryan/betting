// eslint-disable-next-line object-curly-newline
import { takeLatest, put, all, call } from 'redux-saga/effects';

import ApiService from '../../services/api-service';

import {GET_INFO_START, LOGIN_START} from './admin.types';

import {loginSuccess, loginFailure, getInfoSuccess, getInfoFailure} from './admin.actions';

import { transformAdminDataForStorage } from '../../utils/dataUtils';

export function* login({ payload: { username, password } }) {
  try {
    const apiService = new ApiService();
    const adminData = yield apiService.login(username, password);

    yield put(loginSuccess(adminData));
  } catch (error) {
    yield put(loginFailure(error));
  }
}
export function* getInfo({ payload:token}) {
  console.log("token",token)
  try {
    const apiService = new ApiService();
    const info = yield apiService.getInfo(token);
    yield put(getInfoSuccess(info));
  } catch (error) {
    yield put(getInfoFailure(error));
  }
}

export function* onLoginStart() {
  yield takeLatest(LOGIN_START, login);
}
export function* onGetInfoStart() {
  yield takeLatest(GET_INFO_START, getInfo);
}

export function* adminSagas() {
  yield all([call(onLoginStart)]);
}
export function* userSagas() {
  yield all([call(onGetInfoStart)]);
}
