/* eslint-disable react/prop-types */
import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

import MessageForm from './MessageForm';
import { sendMessageStart } from '../redux/users/users.actions';

import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  btn: {
    margin: theme.spacing(2)
  }
}));

const MessageModal = ({ sendMsg, token }) => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitForm = values => {
    const msg = values.get('message');
    sendMsg(msg, token);
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        size="medium"
        className={classes.btn}
        onClick={handleOpen}
        startIcon={<Icon>send</Icon>}
      >
        Сообщение всем
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Сообщение:</DialogTitle>
        <DialogContent>
          <MessageForm
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
  sendMsg: (msg, token) => dispatch(sendMessageStart(msg, token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageModal);
