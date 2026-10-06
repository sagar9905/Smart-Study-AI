import mongoose from "mongoose";

const theoryEvaluationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    question: { type: String, required: true },
    studentAnswer: { type: String, required: true },
    score: { type: Number, required: true },
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    suggestions: [{ type: String }],
    improvementAreas: [{ type: String }],
    feedbackSummary: { type: String, default: "" }
  },
  { timestamps: true }
);

export const TheoryEvaluation = mongoose.model("TheoryEvaluation", theoryEvaluationSchema);
