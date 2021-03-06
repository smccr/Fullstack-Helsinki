const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

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

const newUser = {
  username: "testuser",
  password: "testpassword",
  name: "Test User"
}

const userLogin = {
  username: "testuser",
  password: "testpassword"
}

let token = undefined

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject2 = new Blog(initialBlogs[1])
  await blogObject2.save()

  blogObject3 = new Blog(initialBlogs[2])
  await blogObject3.save()

  await api.post('/api/users').send(newUser)

  const response = await api
    .post('/api/login')
    .send(userLogin)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  token = `bearer ${response.body.token}`
})

test(`Blog size should be ${initialBlogs.length}`, async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('Verifies unique post ID', async () => {
  const response = await api.get('/api/blogs')
  response.body.map(blog => expect(blog.id).toBeDefined())
})

test('Verifies the creation of a new blog post', async () => {
  const blogPost = initialBlogs[0]

  await api.post('/api/blogs')
    .set('Authorization', token)
    .send(blogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAdded = await Blog.find({})
  expect(blogAdded).toHaveLength(initialBlogs.length + 1)
})

test('Verifies that if the likes property is missing from the request', async () => {
  const blogPost = {
    title: 'Test blog for likes',
    author: 'Test author for likes',
    url: 'www.testurlforlikes.com'
  }

  await api.post('/api/blogs')
    .set('Authorization', token)
    .send(blogPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogAdded = await Blog.find({})
  expect(blogAdded[initialBlogs.length].likes).toBe(0)
})

test('Verifies that if the title and url properties are missing from the request data', async () => {
  const blogPost = {
    author: 'Test author'
  }

  await api.post('/api/blogs')
    .set('Authorization', token)
    .send(blogPost)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})