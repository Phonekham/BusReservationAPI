import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var ticketSchema = new Schema({
  ticketNo: {
    type: Number,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
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
  Seat: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Seat',
  },
  price: {
    type: Number,
    required: true,
  },
  employee: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Employee',
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
