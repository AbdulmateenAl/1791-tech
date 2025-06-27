import { books, authors } from './data.js';
import DataLoader from 'dataloader';

const getAuthors = async (authorIds) => {
  console.log('Fetching authors for IDs:', authorIds);
  return authorIds.map(id => authors.find(author => author.id === id));
};

export const authorLoader = new DataLoader(getAuthors);

export const resolvers = {
  Query: {
    books: () => books,
    book: (parent, { id }) => {
      const book = books.find(book => book.id === id);
      if (!book) {
        throw new Error('Book not found');
      }
      return book;
    },
    authors: () => authors,
    author: (parent, { id }) => {
      const author = authors.find(author => author.id === id);
      if (!author) {
        throw new Error('Author not found');
      }
      return author;
    },
  },
  Book: {
    author: (book, __, { authorLoader }) => authorLoader.load(book.authorId),
  },
  Author: {
    books: (author) => books.filter(book => book.authorId === author.id),
  },
  Mutation: {
    addBook: (parent, { input }) => {
      const { title, authorId, genre } = input;
      const newBook = {
        id: String(books.length + 1),
        title,
        authorId,
        genre
      };
      books.push(newBook);
      return newBook;
    },
    addAuthor: (parent, { input }) => {
      const { name } = input;
      const newAuthor = {
        id: String(authors.length + 1),
        name,
      };
      authors.push(newAuthor);
      return newAuthor;
    }
  },
};