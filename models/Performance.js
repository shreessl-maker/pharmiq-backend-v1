import mongoose from "mongoose";

const performanceSchema = new mongoose.Schema(
  {
    staff: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tasksCompleted: Number,
    tasksPending: Number,
    avgCompletionTime: Number,
    productivityScore: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Performance", performanceSchema);
