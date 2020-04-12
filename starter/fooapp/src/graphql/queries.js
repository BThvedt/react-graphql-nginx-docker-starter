import gql from "graphql-tag";

// probably shouldn't get the email in general user requests
// just to be paranoid
// const userDetailFragment = gql`
//   fragment UserDetails on User {
//     id
//     username
//     roles
//   }
// `;

export const SIGNIN_USER = gql`
  mutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      username
      roles
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    getCurrentUser {
      id
      username
      roles
    }
  }
`;

export const GET_EMAIL = gql`
  query {
    getEmail
  }
`;

export const SIGN_OUT = gql`
  mutation {
    signout
  }
`;

export const PROTECTED_QUERY = gql`
  query {
    protectedQuery
  }
`;
