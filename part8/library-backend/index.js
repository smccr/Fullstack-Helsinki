const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server');
const pubsub = new PubSub()

const mongoose = require('mongoose');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(result => {
  console.log('connected to MongoDB');
})
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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

    createUser(
      username: String!
      password: String!
      favoriteGenre: String!
    ): User
    
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!(args.author || args.genre)) {
        const booksFound = await Book.find({}).populate("author");
        return booksFound;
      }

      let booksToReturn;
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        booksToReturn = await Book.find({ author: author._id }).populate("author");
      }

      if (args.genre) {
        console.log(args.genre)
        if (!booksToReturn) {
          booksToReturn = await Book.find({ genres: { $in: args.genre } }).populate("author");
        } else {
          booksToReturn = booksToReturn.filter(book => book.genres.includes(args.genre));
        }
      }

      return booksToReturn;

    },

    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    name: (root) => root.name,
    born: (root) => root.born,
    id: (root) => root.id,
    bookCount: async (root) => {
      const booksByAuthor = await Book.find({ author: { $in: root.id } });
      return booksByAuthor.length;
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const newBookAuthor = args.author;

      try {
        const author = await Author.findOne({ name: newBookAuthor });

        if (!author) {
          const newAuthor = new Author({ name: newBookAuthor });
          await newAuthor.save();
          const book = new Book({ ...args, author: newAuthor._id });
          await book.save();

          pubsub.publish('BOOK_ADDED', { bookAdded: book } )

          return book;
        } else {
          const book = new Book({ ...args, author: author._id });
          await book.save();
          const bookToReturn = await Book.findById(book._id).populate("author");

          pubsub.publish('BOOK_ADDED', { bookAdded: bookToReturn } )

          return bookToReturn;
        }
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const name = args.name;
      const born = args.setBornTo;
      const author = await Author.findOne({ name })
      if (author) {
        const newAuthor = { name, born }
        try {
          const modifiedAuthor = await Author.findByIdAndUpdate(author._id, newAuthor, { new: true });
          return modifiedAuthor;
        }
        catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args });
        }
      } else {
        return null;
      }
    },

    createUser: async (root, args) => {
      // Generating Hash for password
      const saltRounds = 10;
      const password = await bcrypt.hash(args.password, saltRounds);
      const user = new User({
        username: args.username,
        password,
        favoriteGenre: args.favoriteGenre
      });

      try {
        const savedUser = await user.save();
        return savedUser;
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.password);

      if (!(user && passwordCorrect)) {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})