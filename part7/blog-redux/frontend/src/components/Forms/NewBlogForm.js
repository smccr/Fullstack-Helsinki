import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap'

import { setNotification } from '../../redux/reducers/notificationReducer';
import { createBlog } from '../../redux/reducers/blogReducer';

import { WAIT_TIME } from '../../App';
import { useHistory } from 'react-router-dom';

const NewBlogForm = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const addBlog = (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
        likes: 0
      };
      dispatch(createBlog(newBlog));


      setBlogTitle('');
      setBlogAuthor('');
      setBlogUrl('');
      history.push('/')
      dispatch(setNotification('Blog added successfully', 'success', WAIT_TIME));
    } catch (exception) {
      dispatch(setNotification('Failed to add a new blog', 'error', WAIT_TIME));
    }
  };

  return (
    <div>
      <h2>Create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title: </Form.Label>
          <Form.Control
            type="text"
            id="title"
            name="title"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
          <Form.Label>Author: </Form.Label>
          <Form.Control
            type="text"
            id="author"
            name="author"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
          <Form.Label>URL: </Form.Label>
          <Form.Control
            type="text"
            id="url"
            name="author"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
          <br />
          <Button
            size='sm'
            id="submitBlog"
            type="submit">Create</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewBlogForm;