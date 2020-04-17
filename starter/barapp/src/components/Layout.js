import React, { Suspense, lazy } from "react";
import Navbar from "./Navbar";
import PageNotFound from "./PageNotFound";
import { Route, Switch } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../graphql/queries";
import ProtectedRoute from "./ProtectedRoute";
import { DEFAULT_USER } from "../lib/defaults.js";

// lets lazy load everything
const Signin = lazy(() => import("./Signin"));
const Signup = lazy(() => import("./Signup"));
const Profile = lazy(() => import("./Profile"));
const Protected = lazy(() => import("./Protected"));

const Layout = (props) => {
  const { loading, data: { getCurrentUser: user } = DEFAULT_USER } = useQuery(
    GET_USER
  );

  if (loading) {
    return <></>;
  }

  return (
    <div className="layout">
      <Navbar />
      <Suspense fallback={<></>}>
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
      </Suspense>
    </div>
  );
};

export default Layout;
