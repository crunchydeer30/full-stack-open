const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v4: uuid } = require('uuid');
const { GraphQLError } = require('graphql');

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

const typeDefs = `
  type Author {
    name: String!
    bookCount: Int!
    born: Int
  }

  type Book {
    title: String!
    author: String!
    published: Int!,
    genres: [String!]!
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
    ): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let response = books;

      const byAuthor = (book) => book.author === args.author;
      const byGenre = (book) => book.genres.includes(args.genre);

      if (args.author) response = response.filter(byAuthor);
      if (args.genre) response = response.filter(byGenre);

      return response;
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) => {
      const authorBooks = books.filter((book) => book.author === root.name);
      return authorBooks.length;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() };
      if (!authors.find((author) => author.name === book.author)) {
        authors = authors.concat({ name: book.author });
      }
      books = books.concat(book);
      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name);
      if (!author) return;

      if (!args.setBornTo) {
        throw new GraphQLError('Must provide birth date', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
          },
        });
      }

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((a) => (a.name === args.name ? updatedAuthor : a));
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
