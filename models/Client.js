import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    startDate: { type: Date },
    expiryDate: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
