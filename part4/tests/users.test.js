const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeAll(async () => {
  await User.deleteMany({})
})

describe('Invalid users are not created', () => {

  test('Name not included', async () => {
    const user = {
      username: 'Finland',
      password: 'Helsinki'
    }

    const response = await api.post('/api/users').send(user).expect(400).expect('Content-Type', /application\/json/)
    expect(response.body).toStrictEqual({error: 'User validation failed: name: Path `name` is required.'})
  })

  test('Password not included', async () => {
    const user = {
      username: 'Finland',
      name: 'Helsinki'
    }

    const response = await api.post('/api/users').send(user).expect(400).expect('Content-Type', /application\/json/)
    expect(response.body).toStrictEqual({error: 'password is required'})
  })

  test('Name not included', async () => {
    const user = {
      username: 'Finland',
      password: 'Helsinki'
    }

    const response = await api.post('/api/users').send(user).expect(400).expect('Content-Type', /application\/json/)
    expect(response.body).toStrictEqual({error: 'User validation failed: name: Path `name` is required.'})
  })

  test('Username length less than 3', async () => {
    const user = {
      username: 'Fi',
      name: 'Helsinki',
      password: '123'
    }

    const response = await api.post('/api/users').send(user).expect(400).expect('Content-Type', /application\/json/)
    expect(response.body).toStrictEqual({error: 'User validation failed: username: Path `username` (`Fi`) is shorter than the minimum allowed length (3).'})
  })

  test('Password length less than 3', async () => {
    const user = {
      username: 'Finland',
      name: 'Helsinki',
      password: '12'
    }

    const response = await api.post('/api/users').send(user).expect(400).expect('Content-Type', /application\/json/)
    expect(response.body).toStrictEqual({error: 'password length must be 3 characters or more'})
  })

  test('Username is unique', async () => {
    const user = {
      username: 'Finland',
      name: 'Helsinki',
      password: '12345'
    }

    await api.post('/api/users').send(user).expect(200).expect('Content-Type', /application\/json/)
    const response = await api.post('/api/users').send(user).expect(400).expect('Content-Type', /application\/json/)
    expect(response.body).toStrictEqual({error: 'User validation failed: username: Error, expected `username` to be unique. Value: `Finland`'})
  })

})

afterAll(() => {
  mongoose.connection.close()
})