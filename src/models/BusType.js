import mongoose from "mongoose";
const Schema = mongoose.Schema;

var busTypeSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  capacity: {
    type: Number,
  },
  floorType: {
    type: Number,
  },
});

const BusType = mongoose.model("BusType", busTypeSchema);

export default BusType;
