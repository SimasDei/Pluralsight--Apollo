export const sessionResolver = {
  Query: {
    sessions: (parent, args, { dataSources }, info) => {
      return dataSources.sessionAPI.getSessions(args);
    },
    sessionById: (parent, { id }, { dataSources }) => {
      return dataSources.sessionAPI.getSessionById(id);
    },
  },
};
