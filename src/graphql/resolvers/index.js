import authMutation from './auth/authMutation';
import authQuery from './auth/authQuery';
import busTypeMutation from './BusType/mutation';
import busTypeQuery from './BusType/query';
import companyMutation from './Company/mutation';
import companyQuery from './Company/Query';
import busMutation from './Bus/mutation';
import busQuery from './Bus/query';
import routeMutation from './Route/mutation';
import routeQuery from './Route/query';

export default {
  Query: {
    ...authQuery,
    ...busTypeQuery,
    ...companyQuery,
    ...busQuery,
    ...routeQuery,
  },
  Mutation: {
    ...authMutation,
    ...busTypeMutation,
    ...companyMutation,
    ...busMutation,
    ...routeMutation,
  },
};
