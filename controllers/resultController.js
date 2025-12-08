import Result from "../models/Result.js";
import Test from "../models/Test.js";

// Submit a test attempt and calculate score
export const submitResult = async (req, res) => {
  try {
    const { testId, userId, answers } = req.body;

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    let obtainedMarks = 0;
    let totalMarks = 0;

    // Calculate marks for objective questions
    test.questions.forEach((q) => {
      totalMarks += q.marks;
      const ans = answers.find((a) => a.questionId === String(q._id));
      if (ans && q.type === "objective" && ans.answer === q.correctAnswer) {
        obtainedMarks += q.marks;
      }
    });

    const percentage = totalMarks ? (obtainedMarks / totalMarks) * 100 : 0;

    const result = await Result.create({
      testId,
      userId,
      answers,
      totalMarks,
      obtainedMarks,
      percentage,
      status: "completed",
    });

    res.json({
      message: "Result submitted successfully",
      obtainedMarks,
      totalMarks,
      percentage,
      result,
    });
  } catch (err) {
    res.status(500).json({ message: "Error submitting result", error: err.message });
  }
};

// Fetch user result history
export const getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;
    const results = await Result.find({ userId })
      .populate("testId", "title startTime endTime")
      .sort({ createdAt: -1 });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user results", error: err.message });
  }
};
