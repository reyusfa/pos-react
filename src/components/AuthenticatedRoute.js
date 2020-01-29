import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const data = localStorage.getItem('data');
      if(data) {
        return (
          <Component {...props} />
        );
      } else {
        return (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
          }} />
        );
      }
    }}
  />
);

export default AuthenticatedRoute;

