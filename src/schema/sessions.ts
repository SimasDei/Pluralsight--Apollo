import { gql } from 'apollo-server-express';

export const sessionsSchema = gql`
  type Session {
    id: ID!
    title: String!
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    format: String
    track: String @deprecated(reason: "Too many sessions do not fit into a single track, will be revised in the future")
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
