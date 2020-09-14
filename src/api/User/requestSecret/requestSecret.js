import { prisma } from '../../../../generated/prisma-client';
import { generateSecret, sendSecretEmail } from '../../../utils';

export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await sendSecretEmail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};
