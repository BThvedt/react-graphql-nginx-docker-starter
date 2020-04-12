import React from "react";
import ReactDOM from "react-dom";
import "./App.scss";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import * as serviceWorker from "./serviceWorker";

let httpUrl = "http://localhost";

if (process.env.NODE_ENV == "production") {
  httpUrl = process.env.REACT_APP_API_URL;
}

const link = new HttpLink({ uri: httpUrl, credentials: "include" });

const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (o) => o.id,
  }),
  link,
});

// client.resetStore resets the store

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" component={App}></Route>
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
