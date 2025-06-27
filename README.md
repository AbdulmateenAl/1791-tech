# GraphQL API with Apollo Server

This project is a demonstration of a GraphQL API built with Apollo Server. It showcases schema design, resolver implementation, query optimization with DataLoader, and provides a foundation for building more complex GraphQL applications.

## Features

- **GraphQL Schema**: Well-defined schema with `Book` and `Author` types.
- **Queries and Mutations**: Operations to fetch and add data.
- **Data Loading Optimization**: Uses `DataLoader` to solve the N+1 problem when fetching nested data.
- **GraphQL Playground**: Interactive in-browser IDE for exploring the API.
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

The server will start on `http://localhost:4000`. You can open this URL in your web browser to access the GraphQL Playground.

For development, you can use `nodemon` to automatically restart the server on file changes:
```bash
npm run dev
```

## How to Test the API

You can test the API using the built-in GraphQL Playground or an API client like Postman.

### 1. Using GraphQL Playground

The easiest way to test the API is through the GraphQL Playground, which is an interactive in-browser IDE.

1.  Start the server (`npm start`).
2.  Open your web browser and navigate to `http://localhost:4000`.
3.  You will see an interface where you can write your queries on the left and see the results on the right.

**Example Query:**

```graphql
query GetAllBooks {
  books {
    id
    title
    author {
      id
      name
    }
  }
}
```

### 2. Using Postman

You can also use Postman to send requests to your GraphQL API.

1.  **Set up the Request:**
    *   Open Postman and create a new request.
    *   Set the request method to **POST**.
    *   Set the URL to `http://localhost:4000`.

2.  **Configure the Body:**
    *   Go to the **Body** tab.
    *   Select the **GraphQL** radio button.
    *   In the **Query** field, you can enter your GraphQL query or mutation.

3.  **Send the Request:**
    *   Click the **Send** button to execute the request. The response will appear in the response panel below.

**Example: Fetching all books in Postman**

*   **Body (GraphQL Query):**
    ```graphql
    query {
      books {
        id
        title
        author {
          name
        }
      }
    }
    ```

**Example: Adding a new book (Mutation) in Postman**

*   **Body (GraphQL Query):**
    ```graphql
    mutation {
      addBook(title: "A New Adventure", authorId: "2") {
        id
        title
      }
    }
    ```

## Example Queries

Here are some examples of queries and mutations you can run.

### Fetch all books and their authors
```graphql
query {
  books {
    id
    title
    author {
      id
      name
    }
  }
}
```

### Fetch a single author and their books
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

### Add a new book
```graphql
mutation {
  addBook(title: "New Book Title", authorId: "1") {
    id
    title
  }
}"# 1791-tech" 
