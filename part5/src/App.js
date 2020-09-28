import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './components/Notification.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blog, setBlog] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({ message: '', classMessage: '' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      showMessage('Successful login', 'success')
    } catch (exception) {
      showMessage('Wrong credentials', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogUser')
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try {
      const savedBlog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(savedBlog))
      showMessage(`A new blog ${savedBlog.title} by ${savedBlog.author} added`, 'success')
    } catch (exception) {
      showMessage('Error adding new blog', 'error')
    }
  }

  const loginForm = () => (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const newBlogForm = () => (
    <div>
      <h1>Create new</h1>
      <form onSubmit={handleNewBlog}>
        <div>
          Title:
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            type="text"
            value={author}
            name="Password"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  const showBlogs = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const showName = () => (
    <div>
      {user.name} logged in
      <button onClick={handleLogout} >logout</button>
    </div>
  )

  const showMessage = (msg, classMessage) => {
    setMessage({ message: msg, classMessage: classMessage })
    setTimeout(() => {
      setMessage({ message: null, classMessage: null })
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message.message} classMessage={message.classMessage} />
        { loginForm()}
      </div>
    )
  } else {
    return (
      <div>
        <Notification message={message.message} classMessage={message.classMessage} />
        {showName()}
        {newBlogForm()}
        {showBlogs()}
      </div>
    )
  }
}

export default App