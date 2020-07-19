/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
app.use(express.static('build'))

app.use(cors())
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const getRandomInt = () => {
  const min = Math.ceil(50562)
  const max = Math.floor(6484984966848)
  return Math.floor(Math.random() * (max - min)) + min
}

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    return res.json(persons)
  }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        return response.json(person)
      } else {
        return response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      return response.status(400).send({ error: 'malformatted id' })
    })
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  if (!name) {
    return res.status(400).send({ error: 'name is missing' })
  }
  if (!number) {
    return res.status(400).send({ error: 'number is missing' })
  }

  const newPerson = new Person({ name, number })

  newPerson.save().then(savedPerson => {
    return res.json(savedPerson)
  })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body
  const personToModify = { name, number }
  if (!name) {
    return res.status(400).send({ error: 'name is missing' })
  }
  if (!number) {
    return res.status(400).send({ error: 'number is missing' })
  }
  Person.findByIdAndUpdate(id, personToModify, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then(person => {
    if (person) {
      return res.status(204).end()
    }
    return res.status(404).end()
  }).catch(error => next(error))
})

app.get('/api/info', (req, res) => {
  Person.find({}).then(persons => {
    return res.send(`Phonebook has info for ${persons.length} people<br>
    ${Date()}`)
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})