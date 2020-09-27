import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = '', lastName = '', bio = '' } = args;
      const isUsernameOrEmailInUse = await prisma.$exists.user({
        OR: [{ username }, { email }],
      });
      if (isUsernameOrEmailInUse) {
        throw Error('The username or email is in use😥');
      }
      await prisma.createUser({ username, email, firstName, lastName, bio });
      return true;
    },
  },
};
