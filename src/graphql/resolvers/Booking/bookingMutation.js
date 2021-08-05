import { UserInputError } from "apollo-server-express";

import Booking from "../../../models/Booking";
import BookingItem from "../../../models/BookingItem";
import DepartureTime from "../../../models/DepartureTime";
import Payment from "../../../models/Payment";

const bookTicket = async (parents, args, { user }, info) => {
  const { departureTime, departureDate, seat, fare, payNow, paymentImage } =
    args.input;

  if (payNow && paymentImage === "") {
    throw new UserInputError(
      "ຖ້າຫາກທ່ານຈະຈ່າຍຕອນນີ້ ກາລຸນາອັບໂລດສະລິບການຈ່າຍເງິນ"
    );
  }
  // validate If empty
  if (departureTime === "") {
    throw new UserInputError("Require DepartureTime", {
      errors: {
        DepartureTime: "ກະລຸນາເລືອກ ສາຍທາງ",
      },
    });
  } else if (departureDate === "") {
    throw new UserInputError("Require departureDate", {
      errors: {
        departureDate: "ກະລຸນາເລືອກວັນເດີນທາງ",
      },
    });
  } else if (seat.length === 0) {
    throw new UserInputError("Require seat", {
      errors: {
        seat: "ກະລຸນາເລືອກບ່ອນນັ່ງ",
      },
    });
  } else if (fare === 0) {
    throw new UserInputError("Require fare", {
      errors: {
        seat: "ກະລຸນາປ້ອນຄ່າເດີນທາງ",
      },
    });
  }

  const lastBooking = await Booking.findOne().sort({ bookingNo: -1 }).limit(1);
  console.log(lastBooking);
  let lastBookingNo;
  lastBooking
    ? (lastBookingNo = lastBooking.bookingNo)
    : (lastBookingNo = 1000);
  let bookingNo = lastBookingNo + 1;

  let newBookingItem;
  let bookingItem;

  // Save Booking Item
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
    ...args.input,
    bookingItem,
    bookingNo,
    qty: seat.length,
  });
  const booking = await newBooking.save().then((b) => {
    // Payment
    if (payNow) {
      Payment.create({ ...args.input, bookingId: b.id });
    }
    return b
      .populate({
        path: "bookingItem",
        populate: [
          [{ path: "seat" }],
          { path: "departureTime", populate: { path: "route" } },
        ],
      })
      .populate({ path: "route" })
      .populate({ path: "departureTime" })
      .execPopulate();
  });
  return booking;
};

export default { bookTicket };
