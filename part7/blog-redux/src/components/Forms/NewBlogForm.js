import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setNotification } from '../../redux/reducers/notificationReducer';
import { createBlog } from '../../redux/reducers/blogReducer';

import { WAIT_TIME } from '../../App';

const NewBlogForm = () => {
  const [blogTitle, setBlogTitle] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');
  const [blogUrl, setBlogUrl] = useState('');

  const dispatch = useDispatch();

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
      dispatch(setNotification('Blog added successfully', 'success', WAIT_TIME));
    } catch (exception) {
      dispatch(setNotification('Failed to add a new blog', 'error', WAIT_TIME));
    }
  };

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            type="text"
            value={blogTitle}
            name="title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id="author"
            type="text"
            value={blogAuthor}
            name="author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id="url"
            type="text"
            value={blogUrl}
            name="url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button
          id="submitBlog"
          type="submit">create</button>
      </form>
    </div>
  );
};

export default NewBlogForm;