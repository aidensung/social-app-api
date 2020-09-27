import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    viewUser: async (_, args) => {
      const { id } = args;
      return prisma.user({ id });
    },
  },
};
