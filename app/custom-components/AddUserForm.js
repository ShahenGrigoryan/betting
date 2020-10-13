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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import {
  TextFieldRedux,
  CheckboxRedux,
  SelectRedux
} from '../components/Forms/ReduxFormMUI';
import styles from '../components/Forms/user-jss';

// validation functions
const required = value => (value == null ? 'Required' : undefined);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined;

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get('password')) {
    return 'Passwords dont match';
  }
  return undefined;
};

// eslint-disable-next-line
class RegisterForm extends React.Component {
  /* handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }; */

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    const {
      classes,
      handleSubmit,
      pristine,
      submitting,
      deco,
      groups
    } = this.props;
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
                    name="userName"
                    component={TextFieldRedux}
                    placeholder="Логин"
                    label="Логин"
                    required
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="password"
                    component={TextFieldRedux}
                    type="password"
                    label="Пароль"
                    required
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              {/* <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="passwordConfirm"
                    component={TextFieldRedux}
                    type="password"
                    label="Re-type Password"
                    required
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                  />
                </FormControl>
              </div> */}
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="email"
                    component={TextFieldRedux}
                    placeholder="Email"
                    label="Email"
                    type="email"
                    validate={[email]}
                    className={classes.field}
                  />
                </FormControl>
              </div>

              <div>
                {groups.length > 0 ? (
                  <FormControl className={classes.formControl}>
                    <Field
                      name="roleName"
                      component={SelectRedux}
                      placeholder="Группа"
                      label="Группа"
                      required
                      className={classes.field}
                    >
                      {groups.map(gruop => (
                        <MenuItem key={gruop} value={gruop}>
                          {gruop}
                        </MenuItem>
                      ))}
                    </Field>
                  </FormControl>
                ) : (
                  <FormControl className={classes.formControl}>
                    <Field
                      name="roleName"
                      component={TextFieldRedux}
                      placeholder="Роль"
                      label="Роль"
                      value="User"
                      required
                      className={classes.field}
                    />
                  </FormControl>
                )}
              </div>
              <div>
                <FormControl
                  className={classes.formControl}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}
                >
                  <Field
                    name="days"
                    component={TextFieldRedux}
                    label="Дней"
                    className={classes.field}
                    type="number"
                    style={{
                      width: '30%'
                    }}
                  />
                  <Field
                    name="hours"
                    component={TextFieldRedux}
                    label="Часов"
                    className={classes.field}
                    type="number"
                    style={{
                      width: '30%'
                    }}
                  />
                  <Field
                    name="minutes"
                    component={TextFieldRedux}
                    label="Минут"
                    className={classes.field}
                    type="number"
                    style={{
                      width: '30%'
                    }}
                  />
                </FormControl>
              </div>
              <div className={classes.optArea}>
                <FormControlLabel
                  className={classes.label}
                  control={<Field name="inSleep" component={CheckboxRedux} />}
                  label="Заморожен"
                />
              </div>

              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="description"
                    className={classes.field}
                    component={TextFieldRedux}
                    placeholder="Описание"
                    label="Описание"
                    multiline={trueBool}
                    rows={4}
                  />
                </FormControl>
              </div>

              <div className={classes.btnArea}>
                <Button variant="contained" color="primary" type="submit">
                  Добавить
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

RegisterForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired
};

const RegisterFormReduxed = reduxForm({
  form: 'registerUser'
})(RegisterForm);

const reducer = 'ui';
const RegisterFormMapped = connect(state => ({
  force: state,
  deco: state.getIn([reducer, 'decoration']),
  groups: state.get('users').userGroups,
  initialValues: {
    roleName: 'User'
  }
}))(RegisterFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
