const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  // Validation for password
  if (!body.password) {
    return response.status(400).json({ error: 'password is required' })
  }
  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password length must be 3 characters or more' })
  }


  // Generating Hash for password
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)


  // Creating user
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()


  return response.json(savedUser)
})


usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter