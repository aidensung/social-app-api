import { prisma } from '../../../../generated/prisma-client';
import { ROOM_FRAGMENT } from '../../../fragments';

export default {
  Query: {
    viewRoom: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;
      const canView = await prisma.$exists.room({
        participants_some: {
          id: user.id,
        },
      });
      if (canView) {
        return prisma.room({ id }).$fragment(ROOM_FRAGMENT);
      } else {
        throw Error("You can't see this");
      }
    },
  },
};
