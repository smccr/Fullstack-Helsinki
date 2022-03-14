const router = require('express').Router()

const { User } = require('../models');
const { SECRET } = require('../util/config');
const jwt = require('jsonwebtoken');

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
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

// router.get('/:id', async (req, res) => {
//   const user = await User.findByPk(req.params.id)
//   if (user) {
//     res.json(user)
//   } else {
//     res.status(404).end()
//   }
// })

router.put('/:username', tokenExtractor, async (req, res) => {
  const { username } = req.decodedToken;
  const newUsername = req.params.username;

  const user = await User.findOne({
    where: {
      username
    }
  });


  if (user) {
    user.username = newUsername;
    await user.save();
    return res.json(user);
  } else {
    return res.status(404).end();
  }
});

module.exports = router