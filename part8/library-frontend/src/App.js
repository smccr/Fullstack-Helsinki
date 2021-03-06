
import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors')
  const [message, setMessage] = useState(null)
  const client = useApolloClient()



  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout} >logout</button>}
      </div>
      <Notify message={message} />

      <Authors
        show={page === 'authors'}
        notify={notify}
      />

      <Books
        show={page === 'books'}
        notify={notify}
      />

      <NewBook
        show={page === 'add'}
        notify={notify}
      />

      {!token && <Login
        show={page === 'login'}
        setPage={setPage}
        notify={notify}
        setToken={setToken}
      />}

      {token && <Recommendations 
        show={page === 'recommend'}
      />}

    </div>
  )
}

export default App