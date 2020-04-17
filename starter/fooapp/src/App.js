import React, { lazy, Suspense, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useMutation, useApolloClient, useQuery } from "@apollo/react-hooks";
import { SIGN_OUT, GET_USER } from "./graphql/queries";
import { DEFAULT_USER } from "./lib/defaults.js";
import AppContext from "./AppContext";
import { useHistory } from "react-router-dom";

const Layout = lazy(() => import("./components/Layout"));
const LandingPage = lazy(() => import("./components/LandingPage"));

const App = () => {
  const history = useHistory();
  const client = useApolloClient();
  const [signOutUser] = useMutation(SIGN_OUT, {
    async onCompleted() {
      // I think we gotta do this first or might get redirected to wrong spot
      history.push("/");
      localStorage.setItem("token", ""); // if we're in development mode, get rid of this
      client.resetStore(); // clearStore doesn't seem to update things so I guess resetStore is the way to go but it does seem to randomly re-run queries
    },
  });

  // gets user on server-side. If in 'development', uses a jwt token
  // otherwise uses an http cookie. There should always be a 'user' object, for no other
  // reason than I tended to prefer it that way. If not logged in everything should be filled with null values
  const {
    loading,
    error,
    data: { getCurrentUser: user } = DEFAULT_USER,
  } = useQuery(GET_USER);

  useEffect(() => {
    // if we sign out, and reset the store, queries on other components will run to get the user again
    // Since we're signed out, let's just write a default user to the cache, and the queries will get the cached user
    if (!user) {
      client.writeQuery({
        query: GET_USER,
        data: {
          getCurrentUser: DEFAULT_USER,
        },
      });
    }
  }, [user, client]);

  // As I was kinda building this on the fly, I ended up conculuding that I kinda always wanted a user object
  // This gets replaced with some actual user data once logged in
  if (loading) {
    return <></>;
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
          <Suspense fallback={<></>}>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/*" component={Layout} />
            </Switch>
          </Suspense>
        </header>
      </div>
    </AppContext.Provider>
  );
};

export default App;
