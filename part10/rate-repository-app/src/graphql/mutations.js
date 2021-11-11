import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: {username: $username, password: $password}) {
      id
      username
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($input: CreateReviewInput) {
    createReview(review: $input) {
      id
      repositoryId
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;