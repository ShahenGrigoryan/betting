import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import AllInclusive from '@material-ui/icons/AllInclusive';
// import Brightness5 from '@material-ui/icons/Brightness5';
// import People from '@material-ui/icons/People';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import Hidden from '@material-ui/core/Hidden';
import brand from 'dan-api/dummy/brand';
import logo from 'dan-images/logo.svg';
import { TextFieldRedux, CheckboxRedux } from './ReduxFormMUI';
import styles from './user-jss';
import Logo from "../../api/ui/images/LogoDark.svg"
import LogoText from "../../api/ui/images/LogoTextDark.svg"
import {Box} from "@material-ui/core";
// import { ContentDivider } from '../Divider';

// validation functions
const required = value => (value == null ? 'Required' : undefined);

/* const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined; */

const LinkBtn = React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/prop-types
  <NavLink to={props.to} {...props} innerRef={ref} />
));

// eslint-disable-next-line
class LoginForm extends React.Component {
  state = {
    showPassword: false
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    // eslint-disable-next-line object-curly-newline
    const { classes, handleSubmit, pristine, submitting, deco } = this.props;
    const { showPassword } = this.state;
    return (
      <Fragment>

        <Hidden mdUp>
          <NavLink to="/" className={classNames(classes.brand, classes.outer)}>
            <img src={Logo}  style={{width:'40px'}} alt={'logo'} />
            <img src={LogoText} style={{width:'127px'}} alt={'Bettting CO'} />
          </NavLink>
        </Hidden>
        <Paper className={classNames(classes.paperWrap, deco && classes.petal)} style={{position:'relative'}}>
          <Box style={{position:'absolute',top:'0',left:'50%',transform:'translateX(-50%)',width:'41.5%',height:'7px',background: '#24BD53',borderRadius:'5px'}}/>
          <Hidden smDown>
            <div className={classes.topBar}>
              <NavLink to="/" className={classes.brand}>
                <img src={Logo}  style={{width:'40px'}} alt={'logo'} />
                <img src={LogoText} style={{width:'127px'}} alt={'Bettting CO'} />
              </NavLink>
              <Button
                size="small"
                className={classes.buttonLink}
                component={LinkBtn}
                to="/register"
              >
                <Icon className={classes.icon}>arrow_forward</Icon>
                Создать новую учетную запись
              </Button>
            </div>
          </Hidden>
          <Typography variant="h4"  className={classes.title} style={{color:'#24BD53',fontSize:'30px',fontWeight:'600'}} gutterBottom>
           Вход
          </Typography>

          {/* <section className={classes.socmedLogin}>
            <div className={classes.btnArea}>
              <Button variant="outlined" size="small" className={classes.redBtn} type="button">
                <AllInclusive className={classNames(classes.leftIcon, classes.iconSmall)} />
                Socmed 1
              </Button>
              <Button variant="outlined" size="small" className={classes.blueBtn} type="button">
                <Brightness5 className={classNames(classes.leftIcon, classes.iconSmall)} />
                Socmed 2
              </Button>
              <Button variant="outlined" size="small" className={classes.cyanBtn} type="button">
                <People className={classNames(classes.leftIcon, classes.iconSmall)} />
                Socmed 3
              </Button>
            </div>
            <ContentDivider content="Or sign in with email" />
          </section> */}
          <section className={classes.formWrap}>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="username"
                    component={TextFieldRedux}
                    placeholder="Your Username"
                    label="Ваше имя пользователя"
                    required
                    validate={[required]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="password"
                    component={TextFieldRedux}
                    type={showPassword ? 'text' : 'password'}
                    label="Ваш пароль"
                    InputProps={{
                      // endAdornment: (
                      //   <InputAdornment position="end">
                      //     <IconButton
                      //       aria-label="Toggle password visibility"
                      //       onClick={this.handleClickShowPassword}
                      //       onMouseDown={this.handleMouseDownPassword}
                      //     >
                      //       {showPassword ? <VisibilityOff /> : <Visibility />}
                      //     </IconButton>
                      //   </InputAdornment>
                      // )
                    }}
                    required
                    validate={required}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div className={classes.optArea}>
                <FormControlLabel
                  className={classes.label}
                  control={<Field name="checkbox" component={CheckboxRedux} />}
                  label="Запомнить"
                />
                <Button
                  size="small"
                  component={LinkBtn}
                  to="/reset-password"
                  className={classes.buttonLink}
                >
                  Забыли пароль?
                </Button>
              </div>
              <div className={classes.btnArea}>
                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  style={{backgroundColor:'#24BD53',boxShadow:'0px 4px 20px rgba(36, 189, 83, 0.8)',borderRadius:'5px',color:'#fff'}}
                >
                  Продолжить

                </Button>
              </div>
            </form>
          </section>
        </Paper>
      </Fragment>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired
};

const LoginFormReduxed = reduxForm({
  form: 'loginForm',
  enableReinitialize: true
})(LoginForm);

const reducerLogin = 'login';
const reducerUi = 'ui';
const FormInit = connect(state => ({
  force: state,
  initialValues: state.getIn([reducerLogin, 'usersLogin']),
  deco: state.getIn([reducerUi, 'decoration'])
}))(LoginFormReduxed);

export default withStyles(styles)(FormInit);
