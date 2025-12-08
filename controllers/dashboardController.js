import Client from "../models/Client.js";
import Test from "../models/Test.js";
import Result from "../models/Result.js";
import User from "../models/User.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const totalTests = await Test.countDocuments();
    const totalResults = await Result.countDocuments();
    const totalStaff = await User.countDocuments({ role: "staff" });
    const totalAdmins = await User.countDocuments({ role: "admin" });

    const latestResults = await Result.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("clientId", "name");

    res.json({
      success: true,
      message: "Dashboard stats fetched successfully",
      stats: {
        totalClients,
        totalTests,
        totalResults,
        totalStaff,
        totalAdmins,
      },
      latestResults,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch dashboard stats", error: error.message });
  }
};
