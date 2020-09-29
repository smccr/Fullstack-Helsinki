import React, { useState } from 'react'

const NewBlogForm = ({ createBlog, showMessage }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setblogAuthor] = useState('')
  const [blogUrl, setblogUrl] = useState('')

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
      setblogAuthor('')
      setblogUrl('')
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
            type="text"
            value={blogTitle}
            name="title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blogAuthor}
            name="author"
            onChange={({ target }) => setblogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blogUrl}
            name="url"
            onChange={({ target }) => setblogUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm