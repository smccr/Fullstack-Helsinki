import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Blogs from './components/Blogs';
import Notification from './components/Notification';
import LoginForm from './components/Forms/LoginForm';
import NewBlogForm from './components/Forms/NewBlogForm';
import Togglable from './components/Togglable';

import blogService from './services/blogs';
import loginService from './services/login';

import { setNotification } from './redux/reducers/notificationReducer';
import { initializeBlogs } from './redux/reducers/blogReducer';
import { setUser } from './redux/reducers/userReducer';

import Users, { } from './components/Users';

import './components/Notification.css';

export const WAIT_TIME = 5;


export const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({
        username, password
      });

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
      );
      blogService.setToken(loggedUser.token);
      dispatch(setUser(loggedUser));
      setUsername('');
      setPassword('');
      dispatch(setNotification('Successful login', 'success', WAIT_TIME));
    } catch (exception) {
      dispatch(setNotification('Wrong credentials', 'error', WAIT_TIME));
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(setUser(null));
    window.localStorage.removeItem('loggedBlogappUser');
    dispatch(setNotification('Logged out', 'success', WAIT_TIME));
  };


  const blogFormRef = React.createRef();

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null ? null : <div><p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button></div>}
      <Switch>
        <Route path='/users' >
          <Users />
        </Route>
        <Route path='/'>

          {user === null ?
            <LoginForm
              username={username}
              password={password}
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
            /> :
            <div>
              <Togglable buttonLabel="New blog" ref={blogFormRef}>
                <NewBlogForm />
              </Togglable>

              <Blogs loggedUser={user} />
            </div>
          }
        </Route>
      </Switch>
    </div>
  );
};

export default App;