import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../graphql/queries";
import AppContext from "../AppContext";
import { DEFAULT_USER } from "../lib/defaults.js";

const Navbar = (props) => {
  const { data: { getCurrentUser: user } = DEFAULT_USER } = useQuery(GET_USER);
  const { signout } = useContext(AppContext);

  return (
    <>
      <NavLink exact to="/">
        Home
      </NavLink>{" "}
      |{" "}
      {!user.id && (
        <>
          <NavLink to="/signin">Signin</NavLink> |{" "}
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
      {user.id && (
        <>
          <NavLink to="/profile">Profile</NavLink> |{" "}
          <NavLink to="/protected">Protected</NavLink> |{" "}
          <button className="button-link" onClick={signout}>
            Sign Out
          </button>
        </>
      )}
    </>
  );
};

export default Navbar;
