import { EDIT_MODAL_OPEN, EDIT_MODAL_CLOSE } from './modals.types';

export const openEditModal = user => ({
  type: EDIT_MODAL_OPEN,
  payload: user
});

export const closeEditModal = () => ({
  type: EDIT_MODAL_CLOSE
});
