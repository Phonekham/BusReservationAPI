import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var bookingSchema = new Schema({
  logNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  ticket: [
    {
      type: Schema.Types.ObjectId,
      required: true,
    },
  ],
  departureTime: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'DepartureTime',
  },
  bus: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Bus',
  },
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
