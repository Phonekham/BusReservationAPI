import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var busTypeSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
});

const BusType = mongoose.model('BusType', busTypeSchema);

export default BusType;
