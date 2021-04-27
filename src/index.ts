import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { exit } from 'process';

import { SpeakersAPI, SessionsAPI } from './datasources';
import { sessionsSchema, speakersSchema } from './schema';
import { sessionResolver, speakerResolver } from './resolvers';

const init = async () => {
  const typeDefs = [sessionsSchema, speakersSchema];
  const resolvers = [sessionResolver, speakerResolver];

  const dataSources = () => ({
    sessionAPI: new SessionsAPI(),
    speakerAPI: new SpeakersAPI(),
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
