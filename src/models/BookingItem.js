import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var bookingItemSchema = new Schema({
  seat: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Seat',
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  booking: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Booking',
  },
});

const BookingItem = mongoose.model('BookingItem', bookingItemSchema);

export default BookingItem;
