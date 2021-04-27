import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { exit } from 'process';

import SessionsAPI from './datasources/sessions';
import { sessionsSchema } from './schema';
import { sessionResolver } from './resolvers';

const init = async () => {
  const typeDefs = [sessionsSchema];
  const resolvers = [sessionResolver];

  const dataSources = () => ({
    sessionAPI: new SessionsAPI(),
  });

  try {
    const server = new ApolloServer({ typeDefs, resolvers, dataSources });
    await server.start();

    const app = express();
    server.applyMiddleware({ app });

    return { server, app };
  } catch (error) {
    console.log('🚀 ~ file: index.ts ~ line 20 ~ init ~ error', error);
    exit();
  }
};

init().then(({ app, server }) => {
  app.listen(4004, () => {
    console.log(`🚀 Server ready at http://localhost:4004${server.graphqlPath}`);
  });
});
