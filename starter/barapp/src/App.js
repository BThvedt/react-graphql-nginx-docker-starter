import React from "react";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import { Route, Switch } from "react-router-dom";
import { useMutation, useApolloClient, useQuery } from "@apollo/react-hooks";
import { SIGN_OUT, GET_USER } from "./graphql/queries";
import { DEFAULT_USER } from "./lib/defaults.js";
import AppContext from "./AppContext";
import { useHistory } from "react-router-dom";

const App = () => {
  // gets user on server-side, uses httpCookie to validate
  // if no user, returns null. Set to empty object simply because I prefer to destructure that way
  // but there's errors if there's no default value if I do
  const { loading, error, data: { getCurrentUser: user } = {} } = useQuery(
    GET_USER
  );

  const history = useHistory();
  const client = useApolloClient();
  const [signOutUser] = useMutation(SIGN_OUT, {
    async onCompleted() {
      // I think we gotta do this first or might get redirected to wrong spot
      history.push("/");
      await client.resetStore(); // nulls out stuff in the apollo store
    },
  });

  // As I was kinda building this on the fly, I ended up conculuding that I kinda always wanted a user object
  // This gets replaced with some actual user data once logged in
  if (loading) {
    return <></>;
  } else if (!error && !user) {
    client.writeQuery({
      query: GET_USER,
      data: {
        getCurrentUser: DEFAULT_USER,
      },
    });
  } else if (error) {
    return <h1>There was an error connecting with the server sry</h1>;
  }

  const signout = () => {
    signOutUser();
  };

  return (
    <AppContext.Provider value={{ signout }}>
      <div className="App">
        <header className="App-header">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/*" component={Layout} />
          </Switch>
        </header>
      </div>
    </AppContext.Provider>
  );
};

export default App;
