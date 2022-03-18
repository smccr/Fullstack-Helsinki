const router = require('express').Router()

const { Blog, User } = require('../models');
const { tokenExtractor } = require('../util/middleware');


router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ['userId']
      }
    }
  });
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    return res.json(user)
  } catch(error) {
    next(error);
  }
})

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