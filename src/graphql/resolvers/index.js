import authMutation from './auth/authMutation';
import authQuery from './auth/authQuery';
import busTypeMutation from './BusType/mutation';
import busTypeQuery from './BusType/query';
import companyMutation from './Company/mutation';
import companyQuery from './Company/Query';
import busMutation from './Bus/mutation';
import busQuery from './Bus/query';

export default {
  Query: {
    ...authQuery,
    ...busTypeQuery,
    ...companyQuery,
    ...busQuery,
  },
  Mutation: {
    ...authMutation,
    ...busTypeMutation,
    ...companyMutation,
    ...busMutation,
  },
};
