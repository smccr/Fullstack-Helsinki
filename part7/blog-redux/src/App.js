import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Blogs from './components/Blogs';
import Notification from './components/Notification';
import LoginForm from './components/Forms/LoginForm';
import NewBlogForm from './components/Forms/NewBlogForm';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

import { setNotification } from './redux/reducers/notificationReducer';
import { initializeBlogs } from './redux/reducers/blogReducer';

import './components/Notification.css';

export const WAIT_TIME = 5;


export const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      );
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      dispatch(setNotification('Successful login', 'success', WAIT_TIME));
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 'error', WAIT_TIME));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(setNotification('Logged out', 'success', WAIT_TIME));
  };

  const blogFormRef = React.createRef();

  const handleLike = async (event, blogID) => {
    event.preventDefault();
    try {
      const blog = blogs.find(b => b.id === blogID);
      const blogPlusLike = { ...blog, likes: blog.likes + 1 };
      await blogService.modify(blogPlusLike.id, blogPlusLike);
      setBlogs(blogs.map(blog => blog.id !== blogID ? blog : blogPlusLike));
    } catch (exception) {
      dispatch(setNotification('Failed to add the like', 'error', WAIT_TIME));
    }
  };

  const handleRemove = async (event, blogID) => {
    event.preventDefault();
    try {
      const blogToRemove = blogs.find(blog => blog.id === blogID);
      if (window.confirm(`Do you want to remove the blog ${blogToRemove.title} by ${blogToRemove.author} ?`)) {
        await blogService.remove(blogID);
        setBlogs(blogs.filter(blog => blog.id !== blogID));
        dispatch(setNotification('Blog removed', 'success', WAIT_TIME));
      }
    } catch (exception) {
      dispatch(setNotification('Failed to remove blog', 'error', WAIT_TIME));
    }
  };


  return (
    <div>
      <h1>Blogs</h1>

      <Notification />

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
            <NewBlogForm />
          </Togglable>

          <Blogs
            handleLike={handleLike}
            handleRemove={handleRemove}
            loggedUser={user}
          />
        </div>
      }
    </div>
  );
};

export default App;