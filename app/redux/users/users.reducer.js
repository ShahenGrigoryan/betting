/* eslint-disable implicit-arrow-linebreak */
import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_START,
  SELECT_USER,
  CREATE_USER,
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  DELETE_USERS_START,
  DELETE_USERS_FAILURE,
  DELETE_USERS_SUCCESS,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  CLEAR_MESSAGE,
  FETCH_USER_GROUPS_SUCCESS,
  FETCH_USER_GROUPS_FAILURE,
  REF_USERS_START,
  REF_USERS_SUCCESS,
  REF_USERS_FAILURE,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  ADD_USERS_TIME_START,
  ADD_USERS_TIME_SUCCESS,
  ADD_USERS_TIME_FAILURE
} from './users.types';
import { EDIT_MODAL_OPEN, EDIT_MODAL_CLOSE } from '../modals/modals.types';
import { addUserToSelect } from '../../utils/dataUtils';

/*
 * message:  {
 *   text: '',
 *   type: ''
 * }
 */

const INIT_STATE = {
  users: [],
  error: null,
  loading: true,
  selectedUsers: [],
  editingUser: null,
  message: null,
  userGroups: []
};

const usersReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_USERS_START:
      return {
        ...state,
        error: null,
        loading: true,
        selectedUsers: []
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users,
        error: null,
        loading: false,
        selectedUsers: [],
        message: { text: action.payload.msg, type: 'success' }
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        users: [],
        error: action.payload,
        loading: false,
        selectedUsers: [],
        message: {
          text: 'Ошибка загрузки данных.',
          type: 'error'
        }
      };
    case SELECT_USER:
      return {
        ...state,
        // eslint-disable-next-line no-confusing-arrow
        selectedUsers: addUserToSelect(action.payload, state.users)
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: {
          text: 'Ошибка создания пользователя. Попробуйте позже.',
          type: 'error'
        }
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        message: {
          text: action.payload,
          type: 'success'
        }
      };
    case CREATE_USER:
    case DELETE_USERS_START:
    case UPDATE_USER_START:
    case REF_USERS_START:
    case ADD_USERS_TIME_START:
      return {
        ...state,
        loading: true
      };
    case DELETE_USERS_SUCCESS:
    case REF_USERS_SUCCESS:
    case ADD_USERS_TIME_SUCCESS:
      return {
        ...state,
        selectedUsers: [],
        error: null,
        loading: false,
        message: {
          text: action.payload,
          type: 'success'
        }
      };
    case DELETE_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        selectedUsers: [],
        loading: false,
        message: {
          text: 'Ошибка выполнения запроса, повторите позже.',
          type: 'error'
        }
      };

    case REF_USERS_FAILURE:
    case ADD_USERS_TIME_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        selectedUsers: [],
        loading: false,
        message: {
          text: action.payload.msg,
          type: 'error'
        }
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        error: null,
        editingUser: null,
        loading: false,
        message: {
          text: action.payload,
          type: 'success'
        }
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
        editingUser: null,
        loading: false,
        message: {
          text: 'Ошибка обновления пользователя. Попробуйте позже.',
          type: 'error'
        }
      };
    case FETCH_USER_GROUPS_SUCCESS:
      return {
        ...state,
        userGroups: action.payload,
        error: null
      };
    case FETCH_USER_GROUPS_FAILURE:
      return {
        ...state,
        error: action.payload,
        userGroups: []
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null
      };
    case EDIT_MODAL_OPEN:
      return {
        ...state,
        editingUser: action.payload
      };
    case EDIT_MODAL_CLOSE:
      return {
        ...state,
        editingUser: null
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        message: {
          text: action.payload,
          type: 'success'
        }
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        error: action.payload,
        message: {
          text: 'Сообщение не отправлено, повторите позднее.',
          type: 'error'
        }
      };
    default:
      return state;
  }
};

export default usersReducer;
