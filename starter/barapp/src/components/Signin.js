import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import { SIGNIN_USER, GET_USER } from "../graphql/queries";

const Signin = (props) => {
  const [error, setError] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const client = useApolloClient();
  const history = useHistory();

  const [signInUser] = useMutation(SIGNIN_USER, {
    onCompleted(data) {
      setError(null);
      const { signin: result } = data;

      if (process.env.NODE_ENV === "development") {
        // in development environment this mutation returns a token
        localStorage.setItem("token", result.token);
        client.query({
          query: GET_USER,
          fetchPolicy: "network-only",
        });
      } else {
        client.writeQuery({
          query: GET_USER,
          data: {
            getCurrentUser: result.user,
          },
        });
      }

      history.push("/");
    },
    onError(err) {
      setError(err.toString());
    },
  });

  function signin(e) {
    e.preventDefault();
    console.log(formState);

    signInUser({
      variables: { email: formState.email, password: formState.password },
    });
  }

  return (
    <>
      <h1>Sign In</h1>
      <p>(Email: bar@barmail.com Password: bar123 )</p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={signin}>
        <p>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            id="email"
            name="email"
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
          />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
          />
        </p>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Signin;
