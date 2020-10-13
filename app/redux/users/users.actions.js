import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SELECT_USER,
  CREATE_USER,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  DELETE_USERS_START,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_FAILURE,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  CLEAR_MESSAGE,
  FETCH_USER_GROUPS_SUCCESS,
  FETCH_USER_GROUPS_FAILURE,
  FETCH_USER_GROUPS_START,
  REF_USERS_START,
  REF_USERS_SUCCESS,
  REF_USERS_FAILURE,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_START,
  SEND_MESSAGE_SUCCESS,
  ADD_USERS_TIME_FAILURE,
  ADD_USERS_TIME_START,
  ADD_USERS_TIME_SUCCESS
} from './users.types';

export const fetchUsersStart = token => ({
  type: FETCH_USERS_START,
  payload: token
});

export const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  payload: users
});

export const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  payload: error
});

export const selectUser = userIds => ({
  type: SELECT_USER,
  payload: userIds
});

export const createUser = (user, token) => ({
  type: CREATE_USER,
  payload: { user, token }
});

export const createUserSuccess = msg => ({
  type: CREATE_USER_SUCCESS,
  payload: msg
});

export const createUserFailure = error => ({
  type: CREATE_USER_FAILURE,
  payload: error
});

export const deleteUsersStart = (users, token) => ({
  type: DELETE_USERS_START,
  payload: { users, token }
});

export const deleteUsersSuccess = msg => ({
  type: DELETE_USERS_SUCCESS,
  payload: msg
});

export const deleteUsersFailure = error => ({
  type: DELETE_USERS_FAILURE,
  payload: error
});

export const updateUserStart = (user, token) => ({
  type: UPDATE_USER_START,
  payload: { user, token }
});

export const updateUserSuccess = msg => ({
  type: UPDATE_USER_SUCCESS,
  payload: msg
});

export const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: error
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE
});

export const fetchUserGroupsStart = token => ({
  type: FETCH_USER_GROUPS_START,
  payload: token
});

export const fetchUserGroupsSuccess = userGroups => ({
  type: FETCH_USER_GROUPS_SUCCESS,
  payload: userGroups
});

export const fetchUserGroupsFailure = error => ({
  type: FETCH_USER_GROUPS_FAILURE,
  payload: error
});

export const refUsersStart = (users, token) => ({
  type: REF_USERS_START,
  payload: { users, token }
});

export const refUsersSuccess = msg => ({
  type: REF_USERS_SUCCESS,
  payload: msg
});

export const refUsersFailure = (error, msg) => ({
  type: REF_USERS_FAILURE,
  payload: { error, msg }
});

export const sendMessageStart = (msg, token) => ({
  type: SEND_MESSAGE_START,
  payload: { msg, token }
});

export const sendMessageSuccess = msg => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: msg
});

export const sendMessageFailure = error => ({
  type: SEND_MESSAGE_FAILURE,
  payload: error
});

export const addUsersTimeStart = (users, token) => ({
  type: ADD_USERS_TIME_START,
  payload: { users, token }
});

export const addUsersTimeSuccess = msg => ({
  type: ADD_USERS_TIME_SUCCESS,
  payload: msg
});

export const addUsersTimeFailure = (error, msg) => ({
  type: ADD_USERS_TIME_FAILURE,
  payload: { error, msg }
});
