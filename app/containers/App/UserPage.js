/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
// import { Switch, Route } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import Loading from 'dan-components/Loading';
import Dashboard from '../Templates/Dashboard';
import { ThemeContext } from './ThemeWrapper';
import {withRouter} from 'react-router-dom'
import StyledNotification from '../../custom-components/StyledNotification';

/* import {
  Parent,
  DashboardPage,
  BlankPage,
  Form,
  Error,
  NotFound
} from '../pageListAsync'; */

import BasicTable from '../../custom-components/BasicTable';

import {
    fetchUsersStart,
    clearMessage,
    fetchUserGroupsStart
} from '../../redux/users/users.actions';
import Header from "../../components/Header/Header";
import UserPageWrapper from "../Templates/UserPageWrapper";

function UserPage({
                         fetchUsers,
                         token,
                         loading,
                         history,
                         clearMsg,
                         message,
                         fetchGroups
                     }) {
    useEffect(() => {
        fetchUsers(token);
        fetchGroups(token);
    }, []);

    const changeMode = useContext(ThemeContext);
    return (
        <UserPageWrapper history={history} changeMode={changeMode}>
            {/*<Header/>*/}
            {loading ? <Loading /> : null}
            {!loading ? <div>user</div> : null}
            {/* <Switch>
        <Route exact path="/app" component={BlankPage} />
        <Route path="/app/dashboard" component={DashboardPage} />
        <Route path="/app/form" component={Form} />
        <Route path="/app/table" component={Table} />
        <Route path="/app/page-list" component={Parent} />
        <Route path="/app/pages/not-found" component={NotFound} />
        <Route path="/app/pages/error" component={Error} />
        <Route component={NotFound} />
      </Switch> */}

            <Snackbar
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
                open={message !== null}
                autoHideDuration={5000}
                onClose={() => clearMsg()}
            >
                <StyledNotification
                    variant={message ? message.type : 'info'}
                    message={message ? message.text : ''}
                    onClose={() => clearMsg()}
                    className=""
                />
            </Snackbar>
        </UserPageWrapper>
    );
}

/* const Application = ({ fetchUsers, token, loading, error }) => {
  useEffect(() => {
    fetchUsers(token);
  }, []);
  return loading ? (
    <Loading />
  ) : !loading && error ? (
    <ErrorWrap title="Ошибка" desc={error.message} />
  ) : (
    <Table />
  );
}; */

UserPage.propTypes = {
    history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    token: state.get('admin').user.token,
    loading: state.get('users').loading,
    message: state.get('users').message,
    history:history,
});

const mapDispatchToProps = dispatch => ({
    fetchUsers: token => dispatch(fetchUsersStart(token)),
    clearMsg: () => dispatch(clearMessage()),
    fetchGroups: token => dispatch(fetchUserGroupsStart(token))
});
const UserPageWithRouter = withRouter(UserPage)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPageWithRouter);
