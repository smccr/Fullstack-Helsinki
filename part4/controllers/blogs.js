const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { body } = request
  if (!(body.title && body.url)) {
    response.status(400).json({ error: "properties missing" })
  }

  const user = await User.findById(body.userID)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const blogSaved = await blog.save()
  user.blogs = user.blogs.concat(blogSaved._id)
  await user.save()
  
  response.status(201).json(blogSaved)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogId = request.params.id
  await Blog.findByIdAndDelete(blogId)
  response.status(204).end()

})

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id
  const body = request.body
  const modifiedBlog = await Blog.findByIdAndUpdate(blogId, body, { new: true })
  response.status(200).json(modifiedBlog)

})


module.exports = blogsRouter