const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
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

  // Checks token
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  // Finds user
  const user = await User.findById(decodedToken.id)
  const blogId = request.params.id


  // Modifies data
  const { title, author, url, likes } = request.body
  const blogToModify = {
    title,
    author,
    url,
    likes,
    user: user._id
   }

  const modifiedBlog = await Blog.findByIdAndUpdate(blogId, blogToModify, { new: true })
    
  return response.status(200).json(modifiedBlog)
})




module.exports = blogsRouter