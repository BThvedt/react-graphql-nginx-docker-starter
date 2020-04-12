import React, { useContext } from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../graphql/queries";
import AppContext from "../AppContext";

const LandingPage = (props) => {
  const { data: { getCurrentUser: user } = {} } = useQuery(GET_USER);
  const { signout } = useContext(AppContext);

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Foo App</p>
        {user.id && <p>Welcome, {user.username}!</p>}
        {!user.id && (
          <ul className="front-page-list">
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        )}
        {user.id && (
          <ul className="front-page-list">
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/protected">Protected</Link>
            </li>
            <li>
              <button className="button-link" onClick={signout}>
                Sign Out
              </button>
            </li>
          </ul>
        )}
      </header>
    </>
  );
};

export default LandingPage;
