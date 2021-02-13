import authMutation from './auth/authMutation';
import authQuery from './auth/authQuery';
import busTypeMutation from './BusType/mutation';

export default {
  Query: {
    ...authQuery,
  },
  Mutation: {
    ...authMutation,
    ...busTypeMutation,
  },
};
