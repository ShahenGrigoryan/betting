/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Icon from '@material-ui/core/Icon';

import AddTimeForm from './AddTimeForm';
import { addUsersTimeStart } from '../redux/users/users.actions';
import { createTimestamp } from '../utils/dataUtils';


const useStyles = makeStyles(theme => ({
  btn: {
    margin: theme.spacing(2)
  }
}));

const AddTimeModal = ({ addTime, token, usersToAddTime }) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitForm = values => {
    const h = parseInt(values.get('addHours'), 10) || 0;

    usersToAddTime.forEach(c => {
      const [subscribe] = c.subscribes;
      subscribe.expirationDate = createTimestamp(0, h, 0, subscribe.expirationDate);
    });

    addTime(usersToAddTime, token);
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
        className={classes.btn}
        onClick={handleOpen}
        startIcon={<Icon>more_time</Icon>}
      >
        Добавить подписку
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Выбранные пользователи:
        </DialogTitle>
        <DialogContent>
          {usersToAddTime.length > 0 ? (
            <List>{renderListItems(usersToAddTime)}</List>
          ) : (
            'Пользователи не выбраны.'
          )}
        </DialogContent>
        <DialogActions>
          {usersToAddTime.length > 0 ? (
            <AddTimeForm
              onSubmit={values => {
                submitForm(values);
                setOpen(false);
              }}
            />
          ) : null}
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
  usersToAddTime: state.get('users').selectedUsers
});

const mapDispatchToProps = dispatch => ({
  addTime: (users, token) => dispatch(addUsersTimeStart(users, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTimeModal);
