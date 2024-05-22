import mongoose, { Schema } from "mongoose";

const BankSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    riskLevel: { type: String, required: true },
    description: { type: String , default:null},

  },
  { timestamps: true }
);

export default mongoose.model("bank", BankSchema);
