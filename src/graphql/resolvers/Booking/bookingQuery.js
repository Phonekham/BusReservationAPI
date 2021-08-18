import { UserInputError } from "apollo-server-express";

import DepartureTime from "../../../models/DepartureTime";
import Seat from "../../../models/Seat";
import BookingItem from "../../../models/BookingItem";
import Booking from "../../../models/Booking";
import Payment from "../../../models/Payment";

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
  // const d = new Date(departureDate);
  // const year = d.getFullYear();
  // const month = d.getMonth();
  // const dates = d.getDate();
  // const dp = `${year}-0${month + 1}-${dates - 1}`;
  // console.log(dp);
  // console.log(departureDate, "paer");
  const date = await BookingItem.aggregate([
    {
      $project: {
        yearMonthDay: {
          $dateToString: { format: "%Y-%m-%d", date: "$departureDate" },
        },
      },
    },
    {
      $match: {
        yearMonthDay: { $eq: departureDate },
      },
    },
  ]);

  const ids = date.map((s) => s._id);
  const bookingItem = await BookingItem.find({
    _id: { $in: ids },
    departureTime,
  });

  const seats = bookingItem.map((s) => s.seat);
  const bookedSeats = await Seat.find({
    _id: { $in: seats },
  });
  return bookedSeats;
};

const bookings = async (parents, args, context, info) => {
  const { status } = args;
  if (status) {
    const bookings = await Booking.find({ status })
      .sort({ createdAt: -1 })
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
      .sort({ status: 1 })
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

const paidBookings = async (parents, args, context, info) => {
  const bookings = await Booking.find({ status: "paid" })
    .populate({
      path: "bookingItem",
      populate: { path: "route departureTime seat" },
    })
    .populate({ path: "member" })
    .populate({ path: "route" })
    .populate({ path: "departureTime" });
  return bookings;
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

const queryPayment = async (parents, args, context, info) => {
  const { bookingId } = args;
  const payment = await Payment.findOne({ bookingId });
  return payment;
};

export default {
  checkDepartureTime,
  getBookedSeats,
  bookings,
  bookingDetail,
  userBookings,
  queryPayment,
  paidBookings,
};
