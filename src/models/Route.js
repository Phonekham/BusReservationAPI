import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var routeSchema = new Schema({
  routeName: {
    type: String,
    required: true,
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
  },
  destination: {
    type: String,
    required: true,
  },
});

const Route = mongoose.model('Route', routeSchema);

export default Route;
