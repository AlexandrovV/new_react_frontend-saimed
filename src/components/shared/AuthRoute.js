import React from "react";
import { isAuthenticated } from "../../helpers/isAuthenticated";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({children, redirectUrl, ...rest}) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() ? children : <Redirect to={{ pathname: redirectUrl, state: { from: location } }} />
      }
    />
  );
};

export default AuthRoute;
