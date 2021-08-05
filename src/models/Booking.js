import mongoose from "mongoose";
const Schema = mongoose.Schema;

var bookingSchema = new Schema(
  {
    bookingItem: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "BookingItem",
      },
    ],
    bookingNo: { type: Number, unique: true },
    qty: { type: Number, required: true },
    fare: { type: Number, required: true },
    fullname: { type: String, required: true },
    tel: { type: String, required: true },
    email: { type: String, required: true },
    member: { type: Schema.Types.ObjectId, required: true, ref: "Member" },
    status: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    departureTime: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "DepartureTime",
    },
    route: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Route",
    },
    departureDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
