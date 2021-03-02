const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()

const Author = require('./models/Author')
const Book = require('./models/Book')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(result => {
  console.log('connected to MongoDB')
})
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
    type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount:Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!(args.author || args.genre)) {
        const booksFound = await Book.find({}).populate("author")
        return booksFound;
      }
    }
    
    /*
    allBooks: (root, args) => {
      if (!(args.author || args.genre)) {
        return books
      }

      let foundBooks = [...books]

      if (args.author) {
        foundBooks = foundBooks.filter(b => b.author === args.author)
      }

      if (args.genre) {
        foundBooks = foundBooks.filter(b => b.genres.includes(args.genre))
      }
      return foundBooks
    }
    */
    ,
    allAuthors: async () => await Author.find({})
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: (root) => books.filter(b => b.author === root.name).length
  },
  Mutation: {

    addBook: async (root, args) => {
      const newBookAuthor = args.author;
      const author = await Author.findOne({ name: newBookAuthor })

      if(!author) {
        const newAuthor = new Author({ name: newBookAuthor });
        await newAuthor.save();
        const book = new Book({...args, author: newAuthor._id});
        return await book.save();
      }
      const book = new Book({...args, author: author._id});
      return await book.save();
    },

    editAuthor: (root, args) => {
      const findAuthor = authors.find(a => a.name === args.name)
      if (findAuthor) {
        const modifiedAuthor = { ...findAuthor, born: args.setBornTo }
        authors = authors.map(a => a.name === findAuthor.name ? modifiedAuthor : a)
        return modifiedAuthor
      }
      return null
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})