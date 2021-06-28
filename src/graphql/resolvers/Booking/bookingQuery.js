import { UserInputError } from "apollo-server-express";

import DepartureTime from "../../../models/DepartureTime";
import Seat from "../../../models/Seat";
import BookingItem from "../../../models/BookingItem";

const checkDepartureTime = async (parents, args, context, info) => {
  const { route, seatQty, departureDate } = args;
  if (!route) {
    throw new UserInputError("ກາລະນາເລືອກປາຍທາງ");
  } else if (!seatQty) {
    throw new UserInputError("ກາລະນາເລືອກຈຳນວນຜູ້ໂດຍສານ");
  } else if (!departureDate) {
    throw new UserInputError("ກາລະນາເລືອກວັນທີ່ເດີນທາງ");
  }

  return await DepartureTime.find({ route })
    .populate({ path: "busType" })
    .populate({ path: "route" })
    .sort({ time: -1 });
};

const getBookedSeats = async (parents, args, context, info) => {
  const { departureDate, departureTime } = args;
  const bookedSeats = await BookingItem.find({
    departureDate: { $eq: departureDate },
    departureTime: { $eq: departureTime },
  });
  const seatArr = bookedSeats.map((b) => b.seat);
  const seats = await Seat.find({ _id: { $in: seatArr } });
  return seats;
};

export default { checkDepartureTime, getBookedSeats };
