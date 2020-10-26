import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'

import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/Forms/LoginForm'
import './components/Notification.css'
import Togglable from './components/Togglable'
import NewBlogForm from './components/Forms/NewBlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ message: '', classMessage: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      showMessage('Successful login', 'success')
    } catch (exception) {
      showMessage('Wrong credentials', 'error')
    }
  }

  const showMessage = (msg, classMessage) => {
    setMessage({ message: msg, classMessage: classMessage })
    setTimeout(() => {
      setMessage({ message: null, classMessage: null })
    }, 5000)
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    showMessage('Logged out', 'success')
  }

  const blogFormRef = React.createRef()

  const handleLike = async (event, blogID) => {
    event.preventDefault()
    try {
      const blog = blogs.find(b => b.id === blogID)
      const blogPlusLike = { ...blog, likes: blog.likes + 1 }
      await blogService.modify(blogPlusLike.id, blogPlusLike)
      setBlogs(blogs.map(blog => blog.id !== blogID ? blog : blogPlusLike))
    } catch (exception) {
      showMessage('Failed to add the like', 'error')
    }
  }

  const handleRemove = async (event, blogID) => {
    event.preventDefault()
    try {
      const blogToRemove = blogs.find(blog => blog.id === blogID)
      if (window.confirm(`Do you want to remove the blog ${blogToRemove.title} by ${blogToRemove.author} ?`)) {
        await blogService.remove(blogID)
        setBlogs(blogs.filter(blog => blog.id !== blogID))
        showMessage('Blog removed', 'success')
      }
    } catch (exception) {
      showMessage('Failed to remove blog', 'error')
    }
  }

  const sortPosts = () => {
    blogs.sort((a, b) => {
      return b.likes - a.likes
    })
  }

  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
  }

  return (
    <div>
      <h1>Blogs</h1>

      <Notification message={message.message} classMessage={message.classMessage} />

      {user === null ?
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        /> :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>

          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <NewBlogForm createBlog={addBlog} showMessage={showMessage}/>
          </Togglable>

          {sortPosts()}
          <Blogs
            blogs={blogs}
            handleLike={handleLike}
            handleRemove={handleRemove}
            loggedUser={user}
          />
        </div>
      }
    </div>
  )
}

export default App