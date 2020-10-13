import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { loginStart } from '../../../redux/admin/admin.actions';

class Login extends React.Component {
  submitForm(values) {
    const { login } = this.props;
    const username = values.get('username');
    const password = values.get('password');
    login({
      username,
      password
    });
  }

  render() {
    const title = brand.name + ' - Login';
    const description = brand.desc;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div className={classes.container}>
          <div className={classes.userFormWrap}>
            <LoginForm onSubmit={values => this.submitForm(values)} />
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  login: usernameAndPassword => dispatch(loginStart(usernameAndPassword))
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Login);
