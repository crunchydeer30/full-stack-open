const jwt = require('jsonwebtoken');
const { GraphQLError } = require('graphql');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');
const { PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub();

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};
      if (args.author) {
        const author = await Author.find({ name: args.author });
        filter.author = author;
      }
      if (args.genre) {
        filter.genres = args.genre;
      }
      return Book.find(filter).populate('author');
    },
    allAuthors: async () => await Author.find({}).populate('books'),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    name: (root) => {
      return root.name;
    },
    bookCount: async (root) => {
      return root.books.length;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError('Not Authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      if (!author) {
        const newAuthor = new Author({ name: args.author });

        try {
          await newAuthor.save();
          author = newAuthor;
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              error,
            },
          });
        }
      }

      const book = new Book({ ...args, author: author });

      try {
        await book.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });
      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.find({ name: args.name });
      author.born = args.setBornTo;

      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError('Not Authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      return user.save().catch((error) => {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'admin') {
        throw new GraphQLError('Wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      const token = jwt.sign(userForToken, process.env.JWT_SECRET);
      return { value: token };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
};

module.exports = resolvers;
