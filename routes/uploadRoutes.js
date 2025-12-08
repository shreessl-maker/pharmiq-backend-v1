import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Client from "../models/Client.js";
import User from "../models/User.js";

const router = express.Router();

// Memory storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ===== Super Admin Logo Upload =====
router.post("/logo/superadmin", upload.single("file"), async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "pharmiq/logos" },
      async (error, result) => {
        if (error)
          return res.status(500).json({ message: "Cloudinary error", error });

        await User.findOneAndUpdate(
          { role: "superadmin" },
          { profileImage: result.secure_url }
        );

        res.json({
          message: "Super Admin logo uploaded successfully",
          url: result.secure_url,
        });
      }
    );
    stream.end(req.file.buffer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Upload failed", error: error.message });
  }
});

// ===== Client Logo Upload =====
router.post("/logo/client/:id", upload.single("file"), async (req, res) => {
  try {
    const clientId = req.params.id;
    const stream = cloudinary.uploader.upload_stream(
      { folder: `pharmiq/clients/${clientId}` },
      async (error, result) => {
        if (error)
          return res.status(500).json({ message: "Cloudinary error", error });

        await Client.findByIdAndUpdate(clientId, {
          logoUrl: result.secure_url,
        });

        res.json({
          message: "Client logo uploaded successfully",
          url: result.secure_url,
        });
      }
    );
    stream.end(req.file.buffer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Upload failed", error: error.message });
  }
});

export default router;
