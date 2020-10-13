/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable implicit-arrow-linebreak */
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import Icon from '@material-ui/core/Icon';

import { deleteUsersStart } from '../redux/users/users.actions';

const useStyles = makeStyles(theme => ({
  btn: {
    margin: theme.spacing(2)
  }
}));

const DeleteUsersAlert = ({ toDeleteUsers, deleteUsers, token }) => {
  const customStyles = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const handleDelete = (users, t) => () => {
    const toDelete = users.map(item => item.id);
    deleteUsers(toDelete, t);
    setOpen(false);
  };

  const renderListItems = users =>
    users.map(user => (
      <ListItem key={user.id}>
        <ListItemText primary={user.userName} />
      </ListItem>
    ));

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        className={customStyles.btn}
        onClick={handleOpen}
        startIcon={<Icon>person_remove</Icon>}
      >
        Удалить
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Точно удалить выбранных пользователей?
        </DialogTitle>
        <DialogContent>
          {toDeleteUsers.length > 0 ? (
            <List>{renderListItems(toDeleteUsers)}</List>
          ) : (
            'Пользователи не выбраны.'
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          {toDeleteUsers.length > 0 ? (
            <Button
              onClick={handleDelete(toDeleteUsers, token)}
              color="primary"
            >
              Удалить
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  toDeleteUsers: state.get('users').selectedUsers,
  token: state.get('admin').admin.token
});

const mapDispatchToProps = dispath => ({
  deleteUsers: (users, token) => dispath(deleteUsersStart(users, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteUsersAlert);
