  
import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Authors = (props) => {
  const [authors, setAuthors] = useState(null)
  const result = useQuery(ALL_BOOKS)
    useEffect(() => {
      if(result.data) {
        setAuthors(result.data.allAuthors)
      }
    }, [result.data])
  
  
  if (!props.show) {
    return null
  }

  if(!authors) {
    return null
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

    </div>
  )
}

export default Authors
