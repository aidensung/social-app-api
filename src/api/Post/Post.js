import { prisma } from '../../../generated/prisma-client';

export default {
  Post: {
    files: ({ id }) => prisma.post({ id }).files(),
    comments: ({ id }) => prisma.post({ id }).comments(),
    user: ({ id }) => prisma.post({ id }).user(),
    isLiked: async (parent, __, { request }) => {
      const { user } = request;
      const { id } = parent;
      return prisma.$exists.like({
        AND: [
          {
            user: {
              id: user.id,
            },
          },
          {
            post: { id },
          },
        ],
      });
    },
    likeCount: ({ id }) =>
      prisma
        .likesConnection({ where: { post: { id } } })
        .aggregate()
        .count(),
    commentCount: ({ id }) =>
      prisma
        .commentsConnection({ where: { post: { id } } })
        .aggregate()
        .count(),
  },
};
