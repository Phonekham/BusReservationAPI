import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var busSchema = new Schema({
  licencePlate: {
    type: String,
    required: true,
  },
  busType: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'BusType',
  },
  company: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Company',
  },
});

const Bus = mongoose.model('Bus', busSchema);

export default Bus;
