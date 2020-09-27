import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    viewMe: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      return prisma.user({ id: user.id });
    },
  },
};
