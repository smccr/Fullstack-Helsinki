const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { body } = request
  if (!(body.title && body.url)) {
    response.status(400).json({ error: "properties missing" })
  }
  const blog = new Blog(body)
  const blogSaved = await blog.save()
  response.status(201).json(blogSaved)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  console.log(blogId)
  await Blog.findByIdAndDelete(blogId)
  response.status(204).end()

})

module.exports = blogsRouter