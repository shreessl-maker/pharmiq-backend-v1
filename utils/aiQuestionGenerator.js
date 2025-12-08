export async function generateQuestionsFromText(text) {
  if (!process.env.OPENAI_API_KEY) {
    console.log("⚠️  AI module disabled: OpenAI API key not found.");
    return [
      {
        questionText: "Sample question (AI disabled)",
        type: "objective",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: "Option 1",
        marks: 1,
      },
    ];
  }

  // AI-based logic (disabled until key added)
  return [];
}
