import mongoose from "mongoose";
const Schema = mongoose.Schema;

var bookingItemSchema = new Schema({
  seat: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Seat",
  },
  departureTime: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "DepartureTime",
  },
  departureDate: {
    type: Date,
    required: true,
  },
});

const BookingItem = mongoose.model("BookingItem", bookingItemSchema);

export default BookingItem;
