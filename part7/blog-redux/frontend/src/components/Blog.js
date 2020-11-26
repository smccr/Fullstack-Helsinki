import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addLike, deleteBlog } from '../redux/reducers/blogReducer';
import { setNotification } from '../redux/reducers/notificationReducer';

import { WAIT_TIME } from '../App';
import { Button } from 'react-bootstrap';

const Blog = ({ blog, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLike = (event, blog) => {
    event.preventDefault();
    try {
      const blogPlusLike = { ...blog, likes: blog.likes + 1 };
      dispatch(addLike(blogPlusLike));
    } catch (exception) {
      dispatch(setNotification('Failed to add the like', 'error', WAIT_TIME));
    }
  };

  const handleRemove = (event, blog) => {
    event.preventDefault();
    try {
      if (window.confirm(`Do you want to remove the blog ${blog.title} by ${blog.author} ?`)) {
        dispatch(deleteBlog(blog.id));
        dispatch(setNotification('Blog removed', 'success', WAIT_TIME));
        history.push('/');

      }
    } catch (exception) {
      dispatch(setNotification('Failed to remove blog', 'error', WAIT_TIME));
    }
  };

  return (
    <div style={blogStyle} className='blog'>
      <li><h2>{blog.title}</h2>
      <h3>By {blog.author}</h3>
        <div>
          <br /><a href={blog.url}>{blog.url}</a>
          <br />{blog.likes} likes <Button size='sm' onClick={(event) => { handleLike(event, blog); }}>like</Button>
          <br />Added by {blog.user.name}
          <br />{blog.user.username === loggedUser.username ? <Button size='sm' onClick={(event) => { handleRemove(event, blog); }}>Remove</Button> : null}
        </div>
      </li>
      <br />
    </div>
  );

  /*
  return (
    <div style={blogStyle} className='blog'>
      <li><h2>{`${blog.title} ${blog.author}`}</h2>
        <div>
          <br /><a href={blog.url}>{blog.url}</a>
          <br />{blog.likes} likes <button onClick={(event) => { handleLike(event, blog); }}>like</button>
          <br />Added by {blog.user.name}
          <br />{blog.user.username === loggedUser.username ? <button onClick={(event) => { handleRemove(event, blog); }}>Remove</button> : null}
        </div>
      </li>
      <br />
    </div>
  );
  */
};

export default Blog;