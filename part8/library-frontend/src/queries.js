import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount,
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      genres,
      author {
        name,
        id
      }
      published,
      id
    }
  }
`

export const GENRE_BOOKS = gql`
  query genreBooks($genre: String!) {
    allBooks(genre: $genre) {
      title,
      genres,
      author {
        name,
        id
      }
      published,
      id
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title,
      published,
      id
    }
  }
`

export const UPDATE_AUTHOR = gql`
  mutation updateAuthor($name: String!, $year: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $year
    ) {
      name,
      born,
      bookCount,
      id
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

// me: User
export const GET_USER = gql`
  query {
    me {
      username,
      favoriteGenre,
      id
    }
  }
`