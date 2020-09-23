const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Test blog',
    author: 'Test author',
    url: 'www.testurl.com',
    likes: 111
  },
  {
    title: 'Another blog',
    author: 'Another author',
    url: 'www.anotherurl.com',
    likes: 222
  },
  {
    title: 'Third blog',
    author: 'Third author',
    url: 'www.thirdurl.com',
    likes: 333
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()

})

test(`Blog size should be ${initialBlogs.length}`, async () => {
  const response = await api.get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
  })