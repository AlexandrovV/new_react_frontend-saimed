import React from "react";
import {isAuthenticated} from "../../helpers/isAuthenticated";
import {hasRole} from "../../helpers/hasRole";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({children, redirectUrl, role, ...rest}) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() && hasRole(role) ? children : <Redirect to={{ pathname: redirectUrl, state: { from: location } }} />
      }
    />
  );
};

export default AuthRoute;
