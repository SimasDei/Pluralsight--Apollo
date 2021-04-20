import * as express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { exit } from 'process';

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
      level: String
    }

    type Query {
      sessions: [Session]
    }
  `;

  try {
    const server = new ApolloServer({ typeDefs });
    await server.start();

    const app = express();
    server.applyMiddleware({ app });

    app.listen(4004, () => {
      console.log(`🚀 Server ready at http://localhost:4004${server.graphqlPath}`);
    });
    return { server, app };
  } catch (error) {
    console.log('🚀 ~ file: index.ts ~ line 20 ~ init ~ error', error);
    exit();
  }
};

init();
