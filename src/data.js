// In-memory data store for the application.
// In a production environment, this would be replaced with a database.

export const books = [
  { id: '1', title: 'The Great Gatsby', authorId: '1', genre: 'FICTION' },
  { id: '2', title: 'To Kill a Mockingbird', authorId: '2', genre: 'FICTION' },
  { id: '3', title: '1984', authorId: '3', genre: 'FANTASY' },
];

export const authors = [
  { id: '1', name: 'F. Scott Fitzgerald' },
  { id: '2', name: 'Harper Lee' },
  { id: '3', name: 'George Orwell' },
];