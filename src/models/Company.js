import mongoose from 'mongoose';
const Schema = mongoose.Schema;

var companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  joinDate: {
    type: Date,
    required: true,
  },
});

const Company = mongoose.model('Company', companySchema);

export default Company;
