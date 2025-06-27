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
    book: (parent, { id }) => books.find(book => book.id === id),
    authors: () => authors,
    author: (parent, { id }) => authors.find(author => author.id === id),
  },
  Book: {
    author: (book) => authorLoader.load(book.authorId),
  },
  Author: {
    books: (author) => books.filter(book => book.authorId === author.id),
  },
  Mutation: {
    addBook: (parent, { title, authorId }) => {
      const newBook = { id: String(books.length + 1), title, authorId };
      books.push(newBook);
      return newBook;
    },
  },
};