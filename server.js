// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// ✅ Import all route files
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";

dotenv.config();
const app = express();

// ✅ Middleware setup
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// ✅ Register API routes
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/results", resultRoutes);

// ✅ Root check route (for testing deployment)
app.get("/", (req, res) => {
  res.status(200).send("🚀 PillPopHQ Backend API is running successfully!");
});

// ✅ Handle unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ PillPopHQ API running on port ${PORT}`);
});
