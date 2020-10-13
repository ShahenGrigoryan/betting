/* eslint-disable object-curly-newline */
import { takeLatest,takeEvery, put, all, call } from 'redux-saga/effects';

import ApiService from '../../services/api-service';

import {
  FETCH_USERS_START,
  CREATE_USER,
  DELETE_USERS_START,
  UPDATE_USER_START,
  FETCH_USER_GROUPS_START,
  REF_USERS_START,
  ADD_USERS_TIME_START,
  SEND_MESSAGE_START
} from './users.types';

import {
  fetchUsersSuccess,
  fetchUsersFailure,
  createUserFailure,
  createUserSuccess,
  deleteUsersFailure,
  deleteUsersSuccess,
  updateUserSuccess,
  updateUserFailure,
  fetchUserGroupsSuccess,
  fetchUserGroupsFailure,
  refUsersSuccess,
  refUsersFailure,
  sendMessageSuccess,
  sendMessageFailure,
  addUsersTimeFailure,
  addUsersTimeSuccess
} from './users.actions';

import { clearAdminSession } from '../admin/admin.actions';

import {
  calcUserExpirationTime,
  convertDateToString,
  convertDateToObj
} from '../../utils/dataUtils';

function checkErrorStatus(error, status) {
  return error.status === status;
}

export function* fetchUsers({ payload }) {
  try {
    const apiService = new ApiService();
    const usersData = yield apiService.getUsers(payload);

    yield put(
      fetchUsersSuccess({
        users: usersData.map(user => {

          const [subscribeModel] = user.subscribes;

          const expirationTime = calcUserExpirationTime(
            subscribeModel.inSleep,
            subscribeModel.expirationSleep,
            subscribeModel.expirationDate
          );

          return {
            ...user,
            expirationTime,
            expirationTimeString: convertDateToString(expirationTime),
            ...convertDateToObj(expirationTime)
          };
        }),
        msg: 'Список пользователей загружен.'
      })
    );
  } catch (error) {
    if (checkErrorStatus(error, 401)) {
      yield put(clearAdminSession());
    }
    yield put(fetchUsersFailure(error));
  }
}

export function* createUser({ payload: { user, token } }) {
  try {
    const apiService = new ApiService();
    yield apiService.createUser(user, token);
    yield put(createUserSuccess('Пользователь успешно создан.'));
    const payload = token;
    yield fetchUsers({ payload });
  } catch (error) {
    if (checkErrorStatus(error, 401)) {
      yield put(clearAdminSession());
    }
    yield put(createUserFailure(error));
  }
}

export function* deleteUsers({ payload: { users, token } }) {
  const apiService = new ApiService();
  try {
    yield apiService.deleteUsers(users, token);
    yield put(deleteUsersSuccess('Пользователи успешно удалены.'));
    const payload = token;
    yield fetchUsers({ payload });
  } catch (error) {
    if (checkErrorStatus(error, 401)) {
      yield put(clearAdminSession());
    }
    yield put(deleteUsersFailure(error));
  }
}

export function* updateUser({ payload: { user, token } }) {
  const apiService = new ApiService();
  try {
    yield apiService.updateUser(user, token);
    yield apiService.updateBlacklist(user, token);
    yield put(updateUserSuccess('Данные пользователя отредактированы.'));
    const payload = token;
    yield fetchUsers({ payload });
  } catch (error) {
    if (checkErrorStatus(error, 401)) {
      yield put(clearAdminSession());
    }
    yield put(updateUserFailure(error));
  }
}

export function* fetchUserGroups({ payload }) {
  const token = payload;
  const apiService = new ApiService();
  try {
    const groups = yield apiService.getUserGroups(token);
    yield put(fetchUserGroupsSuccess(groups));
  } catch (error) {
    if (checkErrorStatus(error, 401)) {
      yield put(clearAdminSession());
    }
    yield put(fetchUserGroupsFailure(error));
  }
}

export function* refUsers({ payload: { users, token } }) {
  const apiService = new ApiService();
  try {
    const errors = yield apiService.addTimeOrRef(users, token);
    if (errors.length > 0) {
      yield put(
        refUsersFailure(
          errors,
          `Не все запросы выполнены успешно. Количество не обработанных запросов: ${
            errors.length
          }`
        )
      );
    } else {
      yield put(refUsersSuccess('Пользователи обнулены.'));
    }

    const payload = token;
    yield fetchUsers({ payload });
  } catch (error) {
    if (checkErrorStatus(error, 401)) {
      yield put(clearAdminSession());
    }
    yield put(refUsersFailure(error, 'Ошибка запроса, повторите позже.'));
  }
}

export function* sendMessage({ payload: { msg, chatId,token } }) {
  yield;
   const apiService = new ApiService();
  try {
    yield apiService.sendMessage(msg, chatId,token);
    yield put(sendMessageSuccess('Сообщение отправлено.'));
  } catch (error) {
    if (checkErrorStatus(error, 401)) {
      yield put(clearAdminSession());
    }
    yield put(sendMessageFailure(error));
  }
}

export function* addTime({ payload: { users, token } }) {
  const apiService = new ApiService();
  try {
    const errors = yield apiService.addTimeOrRef(users, token);
    if (errors.length > 0) {
      yield put(
        addUsersTimeFailure(
          errors,
          `Не все запросы выполнены успешно. Количество не обработанных запросов: ${
            errors.length
          }`
        )
      );
    } else {
      yield put(addUsersTimeSuccess('Время добавлено.'));
    }
    const payload = token;
    yield fetchUsers({ payload });
  } catch (error) {
    if (checkErrorStatus(error, 401)) {
      yield put(clearAdminSession());
    }
    yield put(addUsersTimeFailure(error, 'Ошибка запроса, повторите позже.'));
  }
}

export function* onCreateUserStart() {
  yield takeLatest(CREATE_USER, createUser);
}

export function* onFetchUsersStart() {
  yield takeLatest(FETCH_USERS_START, fetchUsers);
}

export function* onDeleteUsersStart() {
  yield takeLatest(DELETE_USERS_START, deleteUsers);
}

export function* onUpdateUserStart() {
  yield takeLatest(UPDATE_USER_START, updateUser);
}

export function* onFetchUserGruopsStart() {
  yield takeLatest(FETCH_USER_GROUPS_START, fetchUserGroups);
}

export function* onRefUsersStart() {
  yield takeLatest(REF_USERS_START, refUsers);
}

export function* onSendMessageStart() {
  yield takeEvery(SEND_MESSAGE_START, sendMessage);
}

export function* onAddTimeStart() {
  yield takeLatest(ADD_USERS_TIME_START, addTime);
}

export function* usersSagas() {
  yield all([
    call(onFetchUsersStart),
    call(onCreateUserStart),
    call(onDeleteUsersStart),
    call(onUpdateUserStart),
    call(onFetchUserGruopsStart),
    call(onRefUsersStart),
    call(onSendMessageStart),
    call(onAddTimeStart)
  ]);
}
