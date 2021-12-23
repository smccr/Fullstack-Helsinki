require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
});

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
});

Blog.sync();

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.findAll();
  return res.json(blogs);
});

app.get('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const body = req.body;
    const newBlog = {...body, date: Date.now() };
    const blog = await Blog.create(newBlog);
    
    return res.json(blog)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

app.delete('/api/blogs/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  console.log('blog delete', blog);
  if (blog) {
    await blog.destroy();
    return res.sendStatus(204);
  } else {
    return res.sendStatus(400);
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})