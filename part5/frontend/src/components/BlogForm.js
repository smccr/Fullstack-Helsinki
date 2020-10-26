import React from 'react'


const NewBlogForm = ({
  blogTitle,
  setBlogTitle,
  blogAuthor,
  setblogAuthor,
  blogUrl,
  setblogUrl,
  handleAddBlog }) => {
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleAddBlog}>
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