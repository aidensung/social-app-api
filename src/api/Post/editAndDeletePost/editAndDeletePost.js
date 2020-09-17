import { prisma } from '../../../../generated/prisma-client';

const DELETE = 'DELETE';
const EDIT = 'EDIT';

export default {
  Mutation: {
    editAndDeletePost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, caption, location, action } = args;
      const { user } = request;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({ where: { id }, data: { caption, location } });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error('The post has been already deleted or You are not allowed to do the action');
      }
    },
  },
};
