export const speakerResolver = {
  Query: {
    speakers: (parent, args, { dataSources }, info) => {
      return dataSources.speakerAPI.getSpeakers(args);
    },
    speakerById: (parent, { id }, { dataSources }) => {
      return dataSources.speakerAPI.getSpeakerById(id);
    },
  },
};
