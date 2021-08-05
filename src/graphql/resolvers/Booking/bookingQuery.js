import { UserInputError } from "apollo-server-express";

import DepartureTime from "../../../models/DepartureTime";
import Seat from "../../../models/Seat";
import BookingItem from "../../../models/BookingItem";
import Booking from "../../../models/Booking";

const checkDepartureTime = async (parents, args, context, info) => {
  const { route, departureDate } = args;
  if (!route) {
    throw new UserInputError("ກາລະນາເລືອກປາຍທາງ");
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

const bookings = async (parents, args, context, info) => {
  const { status } = args;
  if (status) {
    const bookings = await Booking.find({ status })
      .populate({
        path: "bookingItem",
        populate: { path: "route departureTime seat" },
      })
      .populate({ path: "member" })
      .populate({ path: "route" })
      .populate({ path: "departureTime" });
    return bookings;
  } else {
    const bookings = await Booking.find({})
      .populate({
        path: "bookingItem",
        populate: { path: "route departureTime seat" },
      })
      .populate({ path: "member" })
      .populate({ path: "route" })
      .populate({ path: "departureTime" });
    return bookings;
  }
};

const userBookings = async (parents, args, context, info) => {
  const bookings = await Booking.find({ member: { $eq: args.id } })
    .populate({
      path: "bookingItem",
      populate: { path: "seat" },
    })
    .populate({ path: "member" })
    .populate({ path: "route" })
    .populate({ path: "departureTime" });
  return bookings;
};

const bookingDetail = async (parents, args, context, info) => {
  const booking = await Booking.findById(args.id)
    .populate({
      path: "bookingItem",
      populate: { path: "route departureTime seat" },
    })
    .populate({ path: "member" })
    .populate({ path: "route" })
    .populate({ path: "departureTime" });
  return booking;
};

export default {
  checkDepartureTime,
  getBookedSeats,
  bookings,
  bookingDetail,
  userBookings,
};
