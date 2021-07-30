import mongoose from "mongoose";
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  paymentDate: { type: Date },
  paymentImage: { type: String },
  paymentStatus: { type: String },
  bookingId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Bookig",
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
