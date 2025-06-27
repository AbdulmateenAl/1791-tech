import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { resolvers, authorLoader } from './resolvers.js';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

const typeDefs = readFileSync('./schema.graphql', 'utf8');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({
    authorLoader,
  }),
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);