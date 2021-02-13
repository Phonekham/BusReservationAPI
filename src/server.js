import fs from 'fs';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';

import resolvers from './graphql/resolvers';
import checkAuth from './utils/checkAuth';

const typeDefs = fs
  .readFileSync(
    path.join(__dirname, './graphql/schema', 'schema.graphql'),
    'utf8'
  )
  .toString();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // check token from headers
    const token = req.headers.authorization || '';
    const employee = checkAuth(token);
    return { employee };
  },
});

export default server;
