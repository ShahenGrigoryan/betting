/* eslint-disable react/prop-types */
/* eslint-disable object-curly-newline */
import React, { useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Snackbar } from '@material-ui/core';
import { ThemeContext } from './ThemeWrapper';
import {withRouter} from 'react-router-dom'
import StyledNotification from '../../custom-components/StyledNotification';


import {
    fetchUsersStart,
    clearMessage,
    fetchUserGroupsStart
} from '../../redux/users/users.actions';
import Header from "../../components/Header/Header";
import UserPageWrapper from "../Templates/UserPageWrapper";
import UserPdf from "../../components/UserPDF/UserPdf";

function UserPage({
                         history,
                         clearMsg,
                         message,

                     }) {
    useEffect(() => {
    }, []);

    const changeMode = useContext(ThemeContext);
    return (
        <UserPageWrapper history={history} changeMode={changeMode}>

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
            <UserPdf/>
        </UserPageWrapper>
    );
}


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
    clearMsg: () => dispatch(clearMessage()),
});
const UserPageWithRouter = withRouter(UserPage)
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPageWithRouter);
