import gql from "graphql-tag";

export const SIGNIN_USER = gql`
  mutation($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      ... on User {
        id
        username
        roles
      }
      ... on Token {
        token
      }
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
