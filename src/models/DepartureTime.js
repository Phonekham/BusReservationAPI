import mongoose from "mongoose";
const Schema = mongoose.Schema;

var departureTimeSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  busType: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "BusType",
  },
  fare: {
    type: Number,
    required: true,
  },
  route: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Route",
  },
  isBookable: {
    type: Boolean,
    required: true,
  },
});

const DepartureTime = mongoose.model("DepartureTime", departureTimeSchema);

export default DepartureTime;
