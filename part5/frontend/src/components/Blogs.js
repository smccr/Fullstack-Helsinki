
import React from 'react'
import Blog from './Blog'
import PropTypes from 'prop-types'

const Blogs = ({ blogs, handleLike, handleRemove, loggedUser }) => {
  return (
    <ul className='blogs'>{blogs.map(blog =>
      <Blog
        key={blog.id}
        blog={blog}
        handleLike={handleLike}
        handleRemove={handleRemove}
        loggedUser={loggedUser}
      />
    )}
    </ul>)
}

Blogs.propTypes = {
  blogs: PropTypes.array,
  handleLike: PropTypes.func,
  handleRemove: PropTypes.func,
  loggedUser: PropTypes.object
}

export default Blogs