/* eslint-disable react/prop-types */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-confusing-arrow */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { TextFieldRedux } from '../components/Forms/ReduxFormMUI';
import styles from '../components/Forms/user-jss';

// eslint-disable-next-line
class AddTimeForm extends React.Component {
  render() {
    const { classes, handleSubmit } = this.props;

    return (
      <section>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '15px'
          }}
        >
          <div>
            <FormControl className={classes.formControl}>
              <Field
                name="addHours"
                className={classes.field}
                component={TextFieldRedux}
                label="+ Часов"
                type="number"
                style={{
                  width: '50%'
                }}
              />
            </FormControl>
          </div>

          <div>
            <Button color="primary" type="submit">
              Отправить
            </Button>
          </div>
        </form>
      </section>
    );
  }
}

AddTimeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

const AddTimeFormReduxed = reduxForm({
  form: 'addTimeForm'
})(AddTimeForm);

const AddTimeFormMapped = connect(state => ({
  force: state
}))(AddTimeFormReduxed);

export default withStyles(styles)(AddTimeFormMapped);
