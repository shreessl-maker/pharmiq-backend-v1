import Test from "../models/Test.js";
import Result from "../models/Result.js";

// create test
export const createTest = async (req, res) => {
  try {
    const test = await Test.create({ ...req.body });
    res.json({ success: true, test });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// update/enable/disable status
export const updateTestStatus = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json({ success: true, test });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// all tests for admin
export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find({ clientId: req.params.clientId });
    res.json({ success: true, tests });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// live tests for staff
export const getLiveTests = async (req, res) => {
  try {
    const tests = await Test.find({ clientId: req.params.clientId, status: "live" });
    res.json({ success: true, tests });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// past tests for staff
export const getPastTests = async (req, res) => {
  try {
    const results = await Result.find({ staffId: req.params.staffId }).populate("testId");
    res.json({ success: true, results });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// submit answers and auto-score objective questions
export const submitResult = async (req, res) => {
  try {
    const { testId, staffId, answers } = req.body;
    const test = await Test.findById(testId);
    if (!test) return res.status(404).json({ success: false, message: "Test not found" });

    let score = 0;
    test.questions.forEach((q, i) => {
      if (q.type === "objective" && q.correctAnswer === answers[i]) score++;
    });

    const result = await Result.create({
      testId,
      staffId,
      answers,
      score,
      total: test.questions.length
    });

    res.json({ success: true, result });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
