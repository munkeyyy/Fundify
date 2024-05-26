import mongoose, { Schema } from "mongoose";
import userModel from "./user.model";
import bankModel from "./bank.model";
const InfoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
  sip: {
    type: Schema.Types.ObjectId,
    ref: bankModel,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },  
  nextPaymentDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("info", InfoSchema);
