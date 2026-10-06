import mongoose from "mongoose";
import { DIFFICULTIES, QUESTION_TYPES } from "../constants/questionTypes.js";

export const questionSchema = new mongoose.Schema(
  {
    questionType: { type: String, enum: QUESTION_TYPES, required: true },
    questionTitle: { type: String, required: true },
    problemDescription: { type: String, default: "" },
    options: [{ type: String }],
    correctOption: { type: String, default: "" },
    sampleInput: { type: String, default: "" },
    sampleOutput: { type: String, default: "" },
    starterCode: { type: String, default: "" },
    difficulty: { type: String, enum: DIFFICULTIES, required: true },
    topic: { type: String, default: "" }
  },
  { _id: true }
);

export const Question = mongoose.model("Question", questionSchema);
