import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import styles from './appStyles-jss';
import LoginBg from "../../api/ui/images/LoginBg.png"

class Outer extends React.Component {
  render() {
    const {
      classes,
      children,
      gradient,
      decoration
    } = this.props;
    return (
      <div style={{backgroundImage:`url(${LoginBg})`,width:'100%',height:'100%',display:'flex',justyfyContent:'center',alignItems:'center',backgroundSize:'cover'}}>
        <main className={classes.outerContent} id="mainContent">
          { decoration && <div className={classes.petal} /> }
          {children}
        </main>
      </div>
    );
  }
}

Outer.propTypes = {
  classes: PropTypes.object.isRequired,
  gradient: PropTypes.bool.isRequired,
  decoration: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

const reducer = 'ui';
const mapStateToProps = state => ({
  gradient: state.getIn([reducer, 'gradient']),
  decoration: state.getIn([reducer, 'decoration']),
  ...state,
});

const OuterMaped = connect(
  mapStateToProps,
)(Outer);

export default (withStyles(styles)(OuterMaped));
