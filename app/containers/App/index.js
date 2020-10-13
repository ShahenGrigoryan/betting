/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from "../../components/Header/Header";

import { Snackbar } from '@material-ui/core';

// import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
// import Auth from './Auth';
import Application from './Application';
import LoginDedicated from '../Pages/Standalone/LoginDedicated';
import ThemeWrapper from './ThemeWrapper';

import StyledNotification from '../../custom-components/StyledNotification';

import { clearAdminSession } from '../../redux/admin/admin.actions';
import { checkAdminSession } from '../../utils/dataUtils';
import UserPage from "./UserPage";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

// eslint-disable-next-line react/prop-types
function App({ admin, error, usersError, clearAdminData,user }) {
  useEffect(() => {
    if (!checkAdminSession(admin,user)) clearAdminData();
    // if (usersError && usersError.status === 401) clearAdminData();
  }, [usersError]);

  return (
    <ThemeWrapper>
      <Switch>
        <Route
          path="/"
          exact
          // eslint-disable-next-line no-confusing-arrow
          render={props =>
            // eslint-disable-next-line implicit-arrow-linebreak
              admin ? <Application {...props} /> :user?<UserPage/> : <Redirect to="/login" />
          }
        />
        <Route
          path="/login"
          // eslint-disable-next-line no-confusing-arrow
          render={() =>
            // eslint-disable-next-line implicit-arrow-linebreak
            admin||user ? <Redirect to="/" /> : <LoginDedicated />
          }
        />
        {/* <Route path="/app" component={Application} />
        <Route component={Auth} />
        <Route component={NotFound} /> */}
      </Switch>
      <Snackbar
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        open={error !== null}
        autoHideDuration={2500}
        onClose={() => clearAdminData()}
      >
        <StyledNotification
          variant="error"
          message={error ? error.message : 'Ошибка входа.'}
          onClose={() => clearAdminData()}
          className=""
        />
      </Snackbar>
    </ThemeWrapper>
  );
}

const mapStateToProps = state => ({
  admin: state.get('admin').admin,
  user:state.get('admin').user,
  error: state.get('admin').error,
  usersError: state.get('users').error
});

const mapDispatchToProps = dispatch => ({
  clearAdminData: () => dispatch(clearAdminSession())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
