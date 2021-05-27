import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Calendar from 'react-calendar';
import './DisableDateStyle.css'

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: '#414141',
    borderRadius: 3,
    color: 'white',
    boxShadow: '0 3px 5px 2px #414141',
    borderStyle: 'hidden'
  },


}


function ClassNames(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Calendar className={clsx(classes.root, className)} {...other} >
      {children || 'class names'}
    </Calendar>
  );
}

ClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ClassNames);