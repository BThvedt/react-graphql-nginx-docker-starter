import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import Protected from "./Protected";
import Navbar from "./Navbar";
import PageNotFound from "./PageNotFound";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../graphql/queries";
import ProtectedRoute from "./ProtectedRoute";

const Layout = (props) => {
  const { loading, data: { getCurrentUser: user } = {} } = useQuery(GET_USER);

  if (loading) {
    return <></>;
  }

  return (
    <div className="layout">
      <Navbar />
      <Switch>
        <ProtectedRoute
          path="/signin"
          component={Signin}
          isAllowed={!user.id}
          redirectTo="/profile"
        />
        <ProtectedRoute
          path="/signup"
          component={Signup}
          isAllowed={!user.id}
          redirectTo="/profile"
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          isAllowed={user.id}
          redirectTo="/signin"
        />
        <ProtectedRoute
          path="/protected"
          component={Protected}
          isAllowed={user.id && user.roles && user.roles.includes("baruser")}
          redirectTo="/profile"
        />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default Layout;
