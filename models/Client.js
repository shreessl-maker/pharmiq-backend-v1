import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  companyName: { type: String },
  address: { type: String },
  phone: { type: String },
  password: { type: String, required: true },
  logoUrl: { type: String, default: "" }, // ✅ Correctly placed inside schema
  createdAt: { type: Date, default: Date.now },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;
