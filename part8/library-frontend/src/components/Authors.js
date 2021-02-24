
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../queries'

const Authors = (props) => {
  const [authors, setAuthors] = useState(null)
  const result = useQuery(ALL_AUTHORS)

  const [editAuthor, editAuthorResult] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [name, setName] = useState('');
  const [year, setYear] = useState('')


  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
    }
  }, [result.data])

  useEffect(() => {
    if (editAuthorResult.data && editAuthorResult.data.editAuthor === null) {
      props.setError('author not found')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editAuthorResult.data])


  if (!props.show) {
    return null
  }

  if (!authors) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name, year } })

    setName('');
    setYear('');
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name &nbsp;
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born &nbsp;
          <input
            type='number'
            value={year}
            onChange={({ target }) => setYear(Number(target.value))}
          />
        </div>



        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors
