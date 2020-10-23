import React, { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, loggedUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  return (
    <div style={blogStyle} className='blog'>
      <li>{`${blog.title} ${blog.author}`} <button onClick={() => setVisible(!visible)}>{visible ? <>hide</> : <>view</>}</button>  {visible ?
        <div>
          <br /><a href={blog.url}>{blog.url}</a>
          <br />{blog.likes} likes <button onClick={(event) => { handleLike(event, blog.id) }}>like</button>
          <br />Added by {blog.user.name}
          <br />{blog.user.username === loggedUser.username ? <button onClick={(event) => { handleRemove(event, blog.id) }}>Remove</button> : null}
        </div> : null}
      </li>
    </div>
  )
}

export default Blog