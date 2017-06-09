import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { isLogin } from '../../actions/auth';

//Mock of an Auth method, can be replaced with an async call to the backend. Must return true or false
// const isAuthenticated = () => false;
const isAuthenticated = () => {
  return isLogin()
};

const PUBLIC_ROOT = '/welcome'; // not login

const AuthRoute = ({component, ...props}) => {
  if (isAuthenticated()) {
    //User is Authenticated
    console.log('is_auth & is_private');
    //If the route is private the user may proceed.
    return <Route { ...props } component={ component } />;
  } else {
    //User is not Authenticated
    console.log('!is_auth & is_private');
    //If the route is private the user is redirected to the app's public root.
    return <Redirect to={ PUBLIC_ROOT } />;
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};

export default withRouter(AuthRoute);