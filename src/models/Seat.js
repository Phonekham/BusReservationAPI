import mongoose from "mongoose";
const Schema = mongoose.Schema;

var seatSchema = new Schema({
  seatNo: {
    type: String,
    required: true,
  },
  busType: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "BusType",
  },
  floor: {
    type: Number,
    required: true,
  },
});

const Seat = mongoose.model("Seat", seatSchema);

export default Seat;
