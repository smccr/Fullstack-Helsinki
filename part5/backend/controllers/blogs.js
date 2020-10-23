const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  // Checks token
  const token = request.token
  const decodedToken = checkToken(token)

  // Finds user
  const userID = decodedToken.id
  const user = await User.findById(userID)

  const { body } = request
  if (!(body.title && body.url)) {
    response.status(400).json({ error: "properties missing" })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  
  const blogSaved = await blog.save()
  user.blogs = user.blogs.concat(blogSaved._id)
  await user.save()

  //Find a better way to do this
  const blogPopulated = await Blog.findById(blogSaved._id).populate('user', { username: 1, name: 1, id: 1 })
  response.status(201).json(blogPopulated)
})

blogsRouter.delete('/:id', async (request, response) => {

  // Checks token
  const token = request.token
  const decodedToken = checkToken(token)

  // Finds user
  const userID = decodedToken.id
  const user = await User.findById(userID)

  // Finds blog
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  // Checks if belongs to the user
  if (blog.user.toString() === user._id.toString()) {

    // Deletes from user blog list
    user.blogs = user.blogs.filter(blog => blog.toString() !== blogId)

    // Saves the changes
    await Blog.findByIdAndDelete(blogId)
    await user.save()

    response.status(204).end()
  } else {
    return response.status(403).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {

  // Checks token
  const token = request.token
  const decodedToken = checkToken(token)

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

const checkToken = (token) => {
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  return decodedToken
}

module.exports = blogsRouter