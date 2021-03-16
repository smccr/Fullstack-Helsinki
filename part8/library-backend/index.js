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
    bookCount: async (root) => {
      const booksByAuthor = await Book.find({ author: { $in: root.id }});
      return booksByAuthor.length;
    } 
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

    editAuthor: async (root, args) => {
      const name = args.name;
      const born = args.setBornTo;
      const author = await Author.findOne({ name })
      if(author) {
        const newAuthor = { name, born }
        const modifiedAuthor = await Author.findByIdAndUpdate(author._id, newAuthor, { new: true });
        return modifiedAuthor;
      } else {
        return null;
      }
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