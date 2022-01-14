const router = require('express').Router()

const { User } = require('../models');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(authorization.substring(7))
      console.log(SECRET)
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch (error) {
      console.log(error)
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
};

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

router.put('/:username', async (req, res) => {
  const { username } = req.params;
  const { newUsername } = req.body;
  const user = await User.findOne({
    where: {
      username
    }
  });

  if (user) {
    user.username = newUsername;
    await user.save();
    res.json(user)
  } else {
    res.status(404).end()
  }
});

module.exports = router