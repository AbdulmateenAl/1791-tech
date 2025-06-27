# GraphQL API with Apollo Server

This project is a demonstration of a GraphQL API built with Apollo Server. It showcases schema design, resolver implementation, query optimization with DataLoader, and provides a foundation for building more complex GraphQL applications.

## Features

- **GraphQL Schema**: Well-defined schema with `Book` and `Author` types, `BookGenre` enum, and input types for mutations.
- **Queries and Mutations**: Operations to fetch and add data with input validation.
- **Data Loading Optimization**: Uses `DataLoader` to solve the N+1 problem when fetching nested data.
- **Error Handling**: Graceful error handling for not-found resources.
- **Apollo Sandbox**: Interactive in-browser IDE for exploring the API.
- **ESM Support**: The project is configured to use ES Modules.

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1.  Clone the repository or download the source code.
2.  Navigate to the project directory in your terminal.
3.  Install the required dependencies:
    ```bash
    npm install
    ```

### Running the Server

To start the GraphQL server, run the following command:

```bash
npm start
```

The server will start on `http://localhost:4000`. You can open this URL in your web browser to access the Apollo Sandbox.

For development, you can use `nodemon` to automatically restart the server on file changes:
```bash
npm run dev
```

## How to Test the API

You can test the API using the built-in Apollo Sandbox or an API client like Postman.

### 1. Using Apollo Sandbox (GraphQL Playground/Studio)

Apollo Sandbox is an in-browser IDE that allows you to interact with your GraphQL API.

**Query: Get All Books**
```graphql
query GetAllBooks {
  books {
    id
    title
    genre
    author {
      id
      name
    }
  }
}
```

**Query: Get a Single Book**
```graphql
query GetBookById {
  book(id: "1") {
    id
    title
    genre
    author {
      name
    }
  }
}
```

**Query: Get All Authors**
```graphql
query GetAllAuthors {
  authors {
    id
    name
    books {
      id
      title
    }
  }
}
```

**Query: Get a Single Author**
```graphql
query GetAuthorById {
  author(id: "1") {
    id
    name
    books {
      id
      title
    }
  }
}
```

**Mutation: Add a New Book**
```graphql
mutation AddNewBook {
  addBook(input: {
    title: "The Sorcerer's Stone",
    authorId: "4",
    genre: FANTASY
  }) {
    id
    title
    genre
    author {
      name
    }
  }
}
```

**Mutation: Add a New Author**
```graphql
mutation AddNewAuthor {
  addAuthor(input: {
    name: "J.K. Rowling"
  }) {
    id
    name
  }
}
```

### 2. Using Postman

**Query: Get All Books**
- **URL**: `http://localhost:4000`
- **Method**: `POST`
- **Body**: (GraphQL)
  ```graphql
  query {
    books {
      id
      title
      genre
      author {
        name
      }
    }
  }
  ```

**Query: Get a Single Book**
- **URL**: `http://localhost:4000`
- **Method**: `POST`
- **Body**: (GraphQL)
  ```graphql
  query {
    book(id: "1") {
      id
      title
      genre
      author {
        name
      }
    }
  }
  ```

**Query: Get All Authors**
- **URL**: `http://localhost:4000`
- **Method**: `POST`
- **Body**: (GraphQL)
  ```graphql
  query {
    authors {
      id
      name
      books {
        id
        title
      }
    }
  }
  ```

**Query: Get a Single Author**
- **URL**: `http://localhost:4000`
- **Method**: `POST`
- **Body**: (GraphQL)
  ```graphql
  query {
    author(id: "1") {
      id
      name
      books {
        id
        title
      }
    }
  }
  ```

**Mutation: Add a New Book**
- **URL**: `http://localhost:4000`
- **Method**: `POST`
- **Body**: (GraphQL with variables)
  - **Query**:
    ```graphql
    mutation AddNewBook($input: AddBookInput!) {
      addBook(input: $input) {
        id
        title
        genre
        author {
          name
        }
      }
    }
    ```
  - **Variables**:
    ```json
    {
      "input": {
        "title": "The Chamber of Secrets",
        "authorId": "4",
        "genre": "FANTASY"
      }
    }
    ```

**Mutation: Add a New Author**
- **URL**: `http://localhost:4000`
- **Method**: `POST`
- **Body**: (GraphQL with variables)
  - **Query**:
    ```graphql
    mutation AddNewAuthor($input: AddAuthorInput!) {
      addAuthor(input: $input) {
        id
        name
      }
    }
    ```
  - **Variables**:
    ```json
    {
      "input": {
        "name": "J.K. Rowling"
      }
    }
