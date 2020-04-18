import React from "react";
import ReactDOM from "react-dom";
import "./App.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";

let httpUrl = "";

console.log(process.env.REACT_APP_USE_HTTPS);
let protocol = process.env.REACT_APP_USE_HTTPS === "true" ? "https" : "http";

// next goal: If environment is local, do authentication with
// tolkens and not cookies

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "local") {
  httpUrl = `${protocol}://${process.env.REACT_APP_API_URL}`;
} else if (process.env.NODE_ENV === "development") {
  httpUrl = "http://localhost:9000"; // always just use http
}

const httpLink = new HttpLink({ uri: httpUrl, credentials: "include" });

let link;
if (process.env.NODE_ENV === "development") {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : "",
      },
    };
  });
  link = authLink.concat(httpLink);
} else {
  link = httpLink;
}

const client = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (o) => o.id,
  }),
  link,
});

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
