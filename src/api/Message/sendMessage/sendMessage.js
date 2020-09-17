import { prisma } from '../../../../generated/prisma-client';
import { ROOM_FRAGMENT } from '../../../fragments';

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, text, toId } = args;
      let room;

      if (roomId === undefined) {
        if (
          !(await prisma.$exists.room({
            participants_some: {
              id_in: [toId, user.id],
            },
          })) &&
          user.id !== toId
        ) {
          room = await prisma
            .createRoom({
              participants: {
                connect: [
                  {
                    id: toId,
                  },
                  { id: user.id },
                ],
              },
            })
            .$fragment(ROOM_FRAGMENT);
        } else if (user.id !== toId) {
          const roomArray = await prisma
            .rooms({
              where: {
                participants_some: {
                  id_in: [toId, user.id],
                },
              },
            })
            .$fragment(ROOM_FRAGMENT);
          room = roomArray[0];
        }
      } else {
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      }
      if (!room) {
        throw Error('Room not found');
      }
      console.log(room);
      const getTo = room.participants.filter((participant) => participant.id !== user.id)[0];
      return prisma.createMessage({
        text,
        from: {
          connect: {
            id: user.id,
          },
        },
        to: {
          connect: {
            id: roomId ? getTo.id : toId,
          },
        },
        room: {
          connect: {
            id: room.id,
          },
        },
      });
    },
  },
};
