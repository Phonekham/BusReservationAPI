import mongoose from "mongoose";
const Schema = mongoose.Schema;

var ticketSchema = new Schema(
  {
    ticketNo: {
      type: Number,
      required: true,
    },
    booking: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Booking",
    },
    employee: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;
