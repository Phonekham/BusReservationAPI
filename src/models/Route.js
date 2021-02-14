import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var routeSchema = new Schema({
  routeName: {
    type: String,
  },
  routeEngName: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  departure: {
    type: String,
    required: true,
    default: 'ວຽງຈັນ',
  },
  destination: {
    type: String,
    required: true,
  },
});

const Route = mongoose.model('Route', routeSchema);

export default Route;
