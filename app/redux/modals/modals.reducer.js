import { EDIT_MODAL_OPEN, EDIT_MODAL_CLOSE } from './modals.types';

const INIT_STATE = {
  editOpen: false
};

const modalsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case EDIT_MODAL_OPEN:
      return {
        ...state,
        editOpen: true
      };
    case EDIT_MODAL_CLOSE:
      return {
        ...state,
        editOpen: false
      };
    default:
      return state;
  }
};

export default modalsReducer;
