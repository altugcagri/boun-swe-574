import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, currentUser, editable, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authenticated ? (
        <Component {...props} currentUser={currentUser} editable={editable} />
      ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

export default PrivateRoute