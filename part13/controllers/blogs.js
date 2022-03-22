const router = require('express').Router();
const { Op } = require('sequelize');

const { Blog, User } = require('../models');
const { tokenExtractor } = require('../util/middleware');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const where = {};

  if(req.query.search) {
    where.title = {
      [Op.iLike] : req.query.search
    }
  }

  const blogs = await Blog.findAll({
    attributes: { 
      exclude: ['userId']
    },
    include: {
      model: User,
      attributes: ['name']
    },
    where
  });
  return res.json(blogs);
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.post('/', tokenExtractor, async (req, res) => {
  const { body } = req;
  const { id } = req.decodedToken;
  const user = await User.findByPk(id);
  const newBlog = { ...body, date: Date.now(), userId: user.id };
  const blog = await Blog.create(newBlog);

  return res.json(blog);
});

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  if (req.blog) {
    const userId = req.decodedToken.id;
      const blogUserId = req.blog.userId;

      if (blogUserId === userId) {
        await req.blog.destroy();
        return res.sendStatus(204);
      } else {
        return res.sendStatus(403);
      }
  } else {
    return res.sendStatus(400);
  }
});

router.put('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.blog.likes + 1;
    await req.blog.save();
    res.json(req.blog);
  } else {
    return res.sendStatus(400);
  }
});


module.exports = router;