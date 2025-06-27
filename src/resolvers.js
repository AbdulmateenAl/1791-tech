import { books, authors } from './data.js';
import DataLoader from 'dataloader';

/**
 * Batch function for DataLoader to fetch authors by their IDs.
 * This function is called with an array of author IDs and should return a promise
 * that resolves to an array of authors in the same order.
 * @param {Array<string>} authorIds - An array of author IDs.
 * @returns {Promise<Array<object>>} - A promise that resolves to an array of authors.
 */
const getAuthors = async (authorIds) => {
  // In a real application, this would be a database query.
  console.log('Fetching authors for IDs:', authorIds);
  return authorIds.map(id => authors.find(author => author.id === id));
};

// Create a new DataLoader instance for authors.
export const authorLoader = new DataLoader(getAuthors);

// Resolvers define the functions that are responsible for fetching the data for a schema.
export const resolvers = {
  Query: {
    // Resolver for the "books" query. Returns all books.
    books: () => books,
    // Resolver for the "book" query. Returns a single book by its ID.
    book: (parent, { id }) => {
      const book = books.find(book => book.id === id);
      if (!book) {
        throw new Error('Book not found');
      }
      return book;
    },
    // Resolver for the "authors" query. Returns all authors.
    authors: () => authors,
    // Resolver for the "author" query. Returns a single author by its ID.
    author: (parent, { id }) => {
      const author = authors.find(author => author.id === id);
      if (!author) {
        throw new Error('Author not found');
      }
      return author;
    },
  },
  Book: {
    // Resolver for the "author" field on the Book type.
    // Uses the authorLoader to efficiently fetch the author for a book.
    author: (book, __, { authorLoader }) => authorLoader.load(book.authorId),
  },
  Author: {
    // Resolver for the "books" field on the Author type.
    // Returns all books written by the author.
    books: (author) => books.filter(book => book.authorId === author.id),
  },
  Mutation: {
    // Resolver for the "addBook" mutation. Adds a new book to the data store.
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
    // Resolver for the "addAuthor" mutation. Adds a new author to the data store.
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