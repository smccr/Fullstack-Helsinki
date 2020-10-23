import React, { useState } from 'react'

const NewBlogForm = ({ createBlog, showMessage }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    try {
      createBlog({
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
        likes: 0
      })

      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      showMessage('Blog added successfully', 'success')
    } catch (exception) {
      showMessage('Failed to add a new blog', 'error')
    }
  }

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
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm