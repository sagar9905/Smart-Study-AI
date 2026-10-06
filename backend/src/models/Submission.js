import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    questionType: { type: String, required: true },
    answer: { type: mongoose.Schema.Types.Mixed, required: true },
    score: { type: Number, default: 0 },
    feedback: { type: mongoose.Schema.Types.Mixed, default: {} },
    topic: { type: String, default: "" }
  },
  { _id: false }
);

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  assessmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assessment", required: true },
  answers: { type: [answerSchema], default: [] },
  score: { type: Number, default: 0 },
  feedback: { type: mongoose.Schema.Types.Mixed, default: {} },
  submittedAt: { type: Date, default: Date.now }
});

export const Submission = mongoose.model("Submission", submissionSchema);
