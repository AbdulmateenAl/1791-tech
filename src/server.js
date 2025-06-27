import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { resolvers, authorLoader } from './resolvers.js';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the GraphQL schema from the schema.graphql file.
const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8');

// Create a new ApolloServer instance.
const server = new ApolloServer({
  // The GraphQL schema.
  typeDefs,
  // The resolvers that implement the schema.
  resolvers,
  // Plugins for the Apollo Server.
  // ApolloServerPluginLandingPageLocalDefault provides a local landing page,
  // which is a great tool for development and testing.
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

// Start the standalone server.
const { url } = await startStandaloneServer(server, {
  // The context function is called for every request and returns an object
  // that is passed to the resolvers. This is a great place to pass database
  // connections, data loaders, and other resources to the resolvers.
  context: async () => ({
    authorLoader,
  }),
  // The port to listen on.
  listen: { port: 4000 },
});

// Log the URL of the server to the console.
console.log(`🚀  Server ready at: ${url}`);