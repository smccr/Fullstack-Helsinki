
import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';
import PropTypes from 'prop-types';

const Blogs = ({ handleLike, handleRemove, loggedUser }) => {
  const blogs = useSelector(state => state.blog);

  const sortBlogs = (a, b) => {
    return b.likes - a.likes;
  };

  return (
    <ul className='blogs'>{blogs.sort(sortBlogs).map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLike}
        handleRemove={handleRemove}
        loggedUser={loggedUser}
      />
    )}
    </ul>);
};

Blogs.propTypes = {
  blogs: PropTypes.array,
  handleLike: PropTypes.func,
  handleRemove: PropTypes.func,
  loggedUser: PropTypes.object
};

export default Blogs;