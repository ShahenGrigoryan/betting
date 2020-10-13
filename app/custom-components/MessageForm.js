/* eslint-disable react/prop-types */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-confusing-arrow */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { TextFieldRedux } from '../components/Forms/ReduxFormMUI';
import styles from '../components/Forms/user-jss';

// eslint-disable-next-line
class MessageForm extends React.Component {
  render() {
    const { classes, handleSubmit, pristine, submitting, deco } = this.props;
    const trueBool = true;

    return (
      <Fragment>
        <Paper
          className={classNames(classes.paperWrap, deco && classes.petal)}
          style={{ width: '500px' }}
        >
          {/* <Typography variant="h4" className={classes.title} gutterBottom>
            Регистрация нового пользователя
          </Typography> */}

          <section>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="message"
                    className={classes.field}
                    component={TextFieldRedux}
                    placeholder="Сообщение"
                    label="Сообщение"
                    multiline={trueBool}
                    rows={9}
                  />
                </FormControl>
              </div>

              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="submit">
                  Отправить
                  <ArrowForward
                    className={classNames(classes.rightIcon, classes.iconSmall)}
                    disabled={submitting || pristine}
                  />
                </Button>
              </div>
            </form>
          </section>
        </Paper>
      </Fragment>
    );
  }
}

MessageForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired
};

const MessageFormReduxed = reduxForm({
  form: 'messageForm'
})(MessageForm);

const reducer = 'ui';
const MessageFormMapped = connect(state => ({
  force: state,
  deco: state.getIn([reducer, 'decoration'])
}))(MessageFormReduxed);

export default withStyles(styles)(MessageFormMapped);
