import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_ADMIN_SESSION,
  GET_INFO_START,
  GET_INFO_SUCCESS,
  GET_INFO_FAILURE
} from './admin.types';
import {transformAdminDataForStorage} from "../../utils/dataUtils";

const INIT_STATE = {
  admin: null,
  user: null,
  error: null,
  userInfo:null
};

const adminReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log(state.userInfo)
        if(action.payload.user.roleName === "Owner"){
          state.admin = transformAdminDataForStorage(action.payload)
        }else{
          state.user = transformAdminDataForStorage(action.payload)
        }
      return {
        ...state
      };

        case GET_INFO_SUCCESS:
          console.log("apli",action)
      return {
        ...state,
        userInfo:action.payload,
      };
      case GET_INFO_FAILURE:

      return {
        ...state,
        userInfo:null,
        user:null,
      };

    case LOGIN_FAILURE:
      return {
        ...state,
        admin: null,
        error: action.payload
      };
    case CLEAR_ADMIN_SESSION:
      return {
        ...state,
        admin: null,
        user:null,
        error: null
      };

    default:
      return state;
  }


};

export default adminReducer;
