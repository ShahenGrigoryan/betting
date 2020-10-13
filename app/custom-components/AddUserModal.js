/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import AddUserForm from './AddUserForm';
import { createUser } from '../redux/users/users.actions';

import { createTimestamp } from '../utils/dataUtils';

const useStyles = makeStyles(theme => ({
  btn: {
    margin: theme.spacing(2)
  }
}));

const AddUserModal = ({ create, token }) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitForm = values => {
    const user = {};

    values.forEach((value, key) => {
      user[key] = value;
    });
    user.subscribes = [];
    user.subscribes.push({
      expirationDate: createTimestamp(user.days, user.hours, user.minutes),
      inSleep: user.inSleep || false,
      expirationSleep: user.inSleep ? createTimestamp(user.days, user.hours, user.minutes, 0) : 0
    })
    create(user, token);
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        className={classes.btn}
        onClick={handleOpen}
        startIcon={<Icon>person_add</Icon>}
      >
        Добавить
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Добавить пользователя</DialogTitle>
        <DialogContent>
          <AddUserForm
            onSubmit={values => {
              submitForm(values);
              setOpen(false);
            }}
          />
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
  token: state.get('admin').admin.token
});

const mapDispatchToProps = dispatch => ({
  create: (user, token) => dispatch(createUser(user, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserModal);
