import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var bookingSchema = new Schema(
  {
    bookingItem: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'BookingItem',
      },
    ],
    qty: {
      type: Number,
    },
    fare: { type: Number },
    member: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Member',
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
