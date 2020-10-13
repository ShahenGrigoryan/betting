import { all, call } from 'redux-saga/effects';

import {adminSagas, userSagas} from './admin/admin.sagas';
import { usersSagas } from './users/users.sagas';

export default function* rootSaga() {
  yield all([call(adminSagas), call(usersSagas),call(userSagas)]);
}
