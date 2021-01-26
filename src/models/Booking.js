import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var bookingSchema = new Schema({
  departureTime: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'DepartureTime',
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  departureDate: {
    type: Date,
    required: true,
  },
  member: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
