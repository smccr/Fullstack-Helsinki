import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`