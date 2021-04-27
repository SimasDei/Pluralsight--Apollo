import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { exit } from 'process';

import SessionsAPI from './datasources/sessions';

const init = async () => {
  const typeDefs = gql`
    type Session {
      id: ID!
      title: String!
      description: String
      startsAt: String
      endsAt: String
      room: String
      day: String
      format: String
      track: String
        @deprecated(reason: "Too many sessions do not fit into a single track, will be revised in the future")
      level: String
    }

    type Query {
      sessions(
        id: ID
        title: String
        description: String
        startsAt: String
        endsAt: String
        room: String
        day: String
        format: String
        track: String
        level: String
      ): [Session]
      sessionById(id: ID): Session
    }
  `;

  const resolvers = {
    Query: {
      sessions: (parent, args, { dataSources }, info) => {
        return dataSources.sessionAPI.getSessions(args);
      },
      sessionById: (parent, { id }, { dataSources }) => {
        return dataSources.sessionAPI.getSessionById(id);
      },
    },
  };

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
