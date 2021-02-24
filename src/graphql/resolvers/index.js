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
import departureTimeMutation from './DepartureTime/departureTimeMutation';
import departureTimeQuery from './DepartureTime/departureTimeQuery';
import seatMutation from './Seat/seatMutation';
import seatQuery from './Seat/seatQuery';
import bookingQuery from './Booking/bookingQuery';
import bookingMutation from './Booking/bookingMutation';

export default {
  Query: {
    ...authQuery,
    ...busTypeQuery,
    ...companyQuery,
    ...busQuery,
    ...routeQuery,
    ...departureTimeQuery,
    ...seatQuery,
    ...bookingQuery,
  },
  Mutation: {
    ...authMutation,
    ...busTypeMutation,
    ...companyMutation,
    ...busMutation,
    ...routeMutation,
    ...departureTimeMutation,
    ...seatMutation,
    ...bookingMutation,
  },
};
