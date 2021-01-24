import fs from 'fs';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';

import resolvers from './graphql/resolvers';

const typeDefs = fs
  .readFileSync(
    path.join(__dirname, './graphql/schema', 'schema.graphql'),
    'utf8'
  )
  .toString();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

export default server;
