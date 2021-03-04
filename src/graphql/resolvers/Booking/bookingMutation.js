import { UserInputError } from 'apollo-server-express';

import Booking from '../../../models/Booking';
import BookingItem from '../../../models/BookingItem';
import DepartureTime from '../../../models/DepartureTime';

const bookTicket = async (parents, args, { user }, info) => {
  const { departureTime, departureDate, seat } = args.input;
  const member = user.user;

  // validate If empty
  if (departureTime === '') {
    throw new UserInputError('Require DepartureTime', {
      errors: {
        DepartureTime: 'ກະລຸນາເລືອກ ສາຍທາງ',
      },
    });
  } else if (departureDate === '') {
    throw new UserInputError('Require departureDate', {
      errors: {
        departureDate: 'ກະລຸນາເລືອກວັນເດີນທາງ',
      },
    });
  } else if (seat.length === 0) {
    throw new UserInputError('Require seat', {
      errors: {
        seat: 'ກະລຸນາເລືອກບ່ອນນັ່ງ',
      },
    });
  }

  const depaertureTimeFare = await DepartureTime.findById(departureTime);
  let newBookingItem;
  let bookingItem;

  if (seat.length <= 1) {
    newBookingItem = new BookingItem({
      ...args.input,
    });
    bookingItem = await newBookingItem.save();
  } else {
    const createBookingItems = async () => {
      return Promise.all(
        seat.map((seat) =>
          BookingItem.create({
            ...args.input,
            seat,
          })
        )
      );
    };
    bookingItem = await createBookingItems();
  }

  const newBooking = new Booking({
    bookingItem,
    member,
    qty: seat.length,
    fare: depaertureTimeFare.fare,
  });
  const booking = await newBooking.save().then((b) =>
    b
      .populate({
        path: 'bookingItem',
        populate: [
          [{ path: 'seat' }],
          { path: 'departureTime', populate: { path: 'route' } },
        ],
      })
      .execPopulate()
  );
  return booking;
};

export default { bookTicket };
