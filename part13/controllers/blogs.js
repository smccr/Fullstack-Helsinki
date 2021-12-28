const router = require('express').Router();

const { Blog } = require('../models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  return res.json(blogs);
});

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

router.post('/', async (req, res) => {
  try {
    const body = req.body;
    const newBlog = {...body, date: Date.now() };
    const blog = await Blog.create(newBlog);
    
    return res.json(blog);
  } catch(error) {
    return res.status(400).json({ error });
  }
});

router.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
    return res.sendStatus(204);
  } else {
    return res.sendStatus(400);
  }
});

module.exports = router;