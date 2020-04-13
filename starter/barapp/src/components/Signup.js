import React from "react";

const Signup = (props) => {
  return (
    <>
      <h1>Signup</h1>
      <p>(Not Implemented)</p>
      <form>
        <p>
          <label htmlFor="email">Username</label>
          <br />
          <input type="text" id="username" name="username" />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <br />
          <input type="text" id="email" name="email" />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" id="password" name="password" />
        </p>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Signup;
