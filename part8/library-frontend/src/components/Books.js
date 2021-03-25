import React, { useEffect, useState } from 'react'
import { useQuery, useSubscription, useApolloClient } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'

const Books = ({ show, notify }) => {
  const [books, setBooks] = useState(null);
  const result = useQuery(ALL_BOOKS);
  const [genres, setGenres] = useState(null);
  const [filterBooks, setFilterBooks] = useState(null)
  const client = useApolloClient();

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);

      let allGenres = [];
      result.data.allBooks.map(book => {
        book.genres.map(genre => {
          if (!allGenres.includes(genre)) {
            allGenres.push(genre);
          }
        })
      })
      setGenres(allGenres);
    }
  }, [result.data])

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`New book added
      ${addedBook.title}
      By ${addedBook.author.name}
      `)
      updateCacheWith(addedBook)
    }
  })

  if (!show) {
    return null;
  }

  if (!books) {
    return null;
  }

  const handleButton = (genre) => {
    const filtered = books.filter(book => book.genres.includes(genre) ? book : null);
    setFilterBooks(filtered);
  }

  return (
    <div>
      <h2>books</h2>

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
          {!filterBooks && books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}

          {filterBooks && filterBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      {genres.map(genre => <button key={genre} onClick={() => handleButton(genre)}>{genre}</button>)}
      <button onClick={() => setFilterBooks(null)}>all genres</button>

    </div>
  )
}

export default Books