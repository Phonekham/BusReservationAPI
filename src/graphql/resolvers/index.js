import authMutation from './auth/authMutation';
import authQuery from './auth/authQuery';
import busTypeMutation from './BusType/mutation';
import busTypeQuery from './BusType/query';
import companyMutation from './Company/mutation';
import companyQuery from './Company/Query';

export default {
  Query: {
    ...authQuery,
    ...busTypeQuery,
    ...companyQuery,
  },
  Mutation: {
    ...authMutation,
    ...busTypeMutation,
    ...companyMutation,
  },
};
