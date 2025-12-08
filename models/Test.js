import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  type: { type: String, enum: ["objective", "subjective"], required: true },
  options: [{ type: String }], // for objective questions
  correctAnswer: { type: String }, // optional for subjective
  marks: { type: Number, default: 1 },
});

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    questions: [questionSchema],
    startTime: { type: Date },
    endTime: { type: Date },
    durationMinutes: { type: Number },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Test", testSchema);
