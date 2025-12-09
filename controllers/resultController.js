import Result from "../models/Result.js";

// ✅ Get all results (for admin or superadmin)
export const getAllResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch results", error: error.message });
  }
};

// ✅ Get results by userId
export const getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await Result.find({ userId });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user results", error: error.message });
  }
};

// ✅ Save a new test result
export const saveResult = async (req, res) => {
  try {
    const newResult = new Result(req.body);
    await newResult.save();
    res.status(201).json({ message: "Result saved successfully", result: newResult });
  } catch (error) {
    res.status(500).json({ message: "Failed to save result", error: error.message });
  }
};
