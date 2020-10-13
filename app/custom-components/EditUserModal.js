/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import EditUserForm from './EditUserForm';
import { updateUserStart } from '../redux/users/users.actions';
import { closeEditModal } from '../redux/modals/modals.actions';

import { createTimestamp, convertBlackListUrls } from '../utils/dataUtils';

const EditUserModal = ({ update, token, close, open }) => {
  const submitForm = values => {
    let user = {};
    values.forEach((value, key) => {
      user[key] = value;

      if (value && value.size) {
        user[key] = value.toArray();
        user[key].forEach((subValue, subKey) => { user[key][subKey] = subValue.toObject(); });
      }
    });

    const [subscribeModel] = user.subscribes;

    user.subscribes[0] = {
      ...subscribeModel,
      expirationDate: createTimestamp(user.days, user.hours, user.minutes),
      expirationSleep: subscribeModel.inSleep ? createTimestamp(user.days, user.hours, user.minutes, 0) : 0,
    };

    const userEdit = {
      ...user,
      blackListUrls: convertBlackListUrls(user.blackListUrls)
    };

    update(userEdit, token);
    close();
  };

  const handleClose = () => close();

  return (
    <Fragment>
      {/* <Button
        variant="contained"
        color="primary"
        size="medium"
        className={classes.btn}
        onClick={() => console.log('A')}
      >
        Добавить
      </Button> */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Редактировать пользователя
        </DialogTitle>
        <DialogContent>
          <EditUserForm onSubmit={values => submitForm(values)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  token: state.get('admin').admin.token,
  open: state.get('modals').editOpen
});

const mapDispatchToProps = dispatch => ({
  update: (user, token) => dispatch(updateUserStart(user, token)),
  close: () => dispatch(closeEditModal())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUserModal);
