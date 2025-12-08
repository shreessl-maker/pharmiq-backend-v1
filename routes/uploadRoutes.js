import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import User from "../models/User.js";
import Client from "../models/Client.js";

dotenv.config();
const router = express.Router();

// ✅ Memory storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Cloudinary setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Universal Upload Endpoint
router.post("/logo/:userType/:id?", upload.single("logo"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { userType, id } = req.params;

    // Convert file to base64
    const fileBuffer = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(fileBuffer, {
      folder: `PharmIQ/${userType}`,
      use_filename: true,
      unique_filename: false,
    });

    let updatedDoc = null;

    // ✅ Save to MongoDB
    if (userType === "superadmin" || userType === "admin") {
      updatedDoc = await User.findByIdAndUpdate(
        id,
        { profileImage: result.secure_url },
        { new: true }
      );
    } else if (userType === "client") {
      updatedDoc = await Client.findByIdAndUpdate(
        id,
        { logoUrl: result.secure_url },
        { new: true }
      );
    }

    res.json({
      success: true,
      message: "Logo uploaded successfully",
      url: result.secure_url,
      saved: !!updatedDoc,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

export default router;
