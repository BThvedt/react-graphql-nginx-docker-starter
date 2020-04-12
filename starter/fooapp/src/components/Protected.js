import React from "react";
import { PROTECTED_QUERY } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";

const Protected = () => {
  const { data: { protectedQuery: result } = "" } = useQuery(PROTECTED_QUERY);
  return (
    <>
      <h1>Protected</h1>
      <p>You must have the role 'foouser' to access this route</p>
      <p>{result}</p>
    </>
  );
};

export default Protected;
