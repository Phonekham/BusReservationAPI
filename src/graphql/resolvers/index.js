import authMutation from './auth/authMutation';
import authQuery from './auth/authQuery';
import busTypeMutation from './BusType/mutation';
import busTypeQuery from './BusType/query';

export default {
  Query: {
    ...authQuery,
    ...busTypeQuery,
  },
  Mutation: {
    ...authMutation,
    ...busTypeMutation,
  },
};
