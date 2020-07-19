/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const connectDB = () => {
  const url = `mongodb+srv://sergio:${password}@cluster0-ozsi5.mongodb.net/contact-test?retryWrites=true&w=majority`
  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
}

const addPerson = (name, number) => {
  const person = new Person({ name, number })
  person.save().then((result) => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

const getPersons = () => {
  Person.find({}).then(result => {
    console.log('phonebook')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}

const Person = mongoose.model('Person', personSchema)
const password = process.argv[2]
connectDB()

if (process.argv[3]) {
  const name = process.argv[3]
  const number = process.argv[4]
  addPerson(name, number)
} else {
  getPersons()
}