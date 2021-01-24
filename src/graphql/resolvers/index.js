import authMutation from './auth/authMutation';
import authQuery from './auth/authQuery';

export default {
  Query: {
    ...authQuery,
  },
  Mutation: {
    ...authMutation,
  },
};
