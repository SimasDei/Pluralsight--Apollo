import { gql } from 'apollo-server-express';

export const speakersSchema = gql`
  type Speaker {
    id: String!
    bio: String
    Sessions: [Session]
    name: String
  }

  extend type Query {
    speakers(id: String, bio: String, name: String): [Speaker]
    speakerById(id: String): Speaker
  }
`;
