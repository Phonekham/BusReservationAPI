import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Company = mongoose.model('Company', companySchema);

export default Company;
