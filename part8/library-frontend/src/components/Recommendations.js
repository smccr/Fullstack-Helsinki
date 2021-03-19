import { useLazyQuery, useQuery } from '@apollo/client';
import React, {useEffect, useState} from 'react';
import { GENRE_BOOKS, GET_USER } from '../queries';

const Recommendations = (props) => {
  const [books, setBooks] = useState(null);
  const [getBooks , result] = useLazyQuery(GENRE_BOOKS);
  const user = useQuery(GET_USER);

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  useEffect(() => {
    if(user.data) {
      getBooks({ variables: { genre: user.data.me.favoriteGenre }})
    }
  }, [getBooks, user.data]);

  if (!props.show) {
    return null
  }

  return(
    <div>
      <h1>recommendations</h1>
      books in your favorite genre <strong>{user.data.me.favoriteGenre}</strong>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations;