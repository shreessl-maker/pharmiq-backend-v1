import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Client from "../models/Client.js";
import User from "../models/User.js";
import uploadRoutes from "./routes/uploadRoutes.js";
app.use("/api/upload", uploadRoutes);

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload for Super Admin
router.post("/logo/superadmin", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload_stream(
      { folder: "pharmiq/logos" },
      async (error, cloudResult) => {
        if (error) return res.status(500).json({ message: "Cloudinary error", error });

        await User.findOneAndUpdate(
          { role: "superadmin" },
          { profileImage: cloudResult.secure_url }
        );

        res.json({ message: "Super Admin logo uploaded successfully", url: cloudResult.secure_url });
      }
    );
    result.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

// Upload for Client Admin
router.post("/logo/client/:id", upload.single("file"), async (req, res) => {
  try {
    const clientId = req.params.id;
    const result = await cloudinary.uploader.upload_stream(
      { folder: `pharmiq/clients/${clientId}` },
      async (error, cloudResult) => {
        if (error) return res.status(500).json({ message: "Cloudinary error", error });

        await Client.findByIdAndUpdate(clientId, { logoUrl: cloudResult.secure_url });
        res.json({ message: "Client logo uploaded successfully", url: cloudResult.secure_url });
      }
    );
    result.end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
});

export default router;
