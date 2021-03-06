/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import languageProviderReducer from 'containers/LanguageProvider/reducer';
import login from './modules/login';
import uiReducer from './modules/ui';
import initval from './modules/initForm';

import adminReducer from './admin/admin.reducer';
import usersReducer from './users/users.reducer';
import modalsReucer from './modals/modals.reducer';

const persistConfig = {
  key: 'root',
  storage
};

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    admin: persistReducer(persistConfig, adminReducer),
    users: usersReducer,
    modals: modalsReucer,
    form,
    login,
    ui: uiReducer,
    initval,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
