import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) => {
  return isAllowed ? (
    <Route {...props} />
  ) : (
    <Redirect to={redirectTo ? redirectTo : "/signin"} />
  );
};

export default ProtectedRoute;
