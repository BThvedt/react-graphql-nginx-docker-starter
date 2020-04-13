import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../graphql/queries";
import AppContext from "../AppContext";

const Navbar = (props) => {
  const { data: { getCurrentUser: user } = {} } = useQuery(GET_USER);
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
