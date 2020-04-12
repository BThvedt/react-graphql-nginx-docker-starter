import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_EMAIL, GET_USER } from "../graphql/queries";

const Profile = () => {
  // We will have a user since this route is protected
  const { data: { getCurrentUser: user } = {} } = useQuery(GET_USER);
  // get email runs every time, because I don't want to store it client side longer than I have to
  const { loading, data: { getEmail: email } = "" } = useQuery(GET_EMAIL, {
    fetchPolicy: "no-cache",
  });

  if (loading) {
    return <></>;
  }

  return (
    <>
      <h1>Your Profile</h1>
      <p>User Name: {user.username}</p>
      <p>Email: {email}</p>
      <p>Roles: {user.roles.join(" ")}</p>
    </>
  );
};

export default Profile;
