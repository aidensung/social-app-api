import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    viewPosts: (_, __) => {
      return prisma.posts({
        orderBy: 'createdAt_DESC',
      });
    },
  },
};
