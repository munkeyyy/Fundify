import mongoose, { Schema } from "mongoose";

const BankSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    riskLevel: { type: String, required: true },
    category:{type:String, default:"equity"},
    image:{
      type:String,
      default:null
    },
    returns:{
      type:String,
      default:null
    },
    description: { type: String , default:null},

  },
  { timestamps: true }
);

export default mongoose.model("bank", BankSchema);
