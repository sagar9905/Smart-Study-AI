import mongoose from "mongoose";
import { ASSESSMENT_TYPES, DIFFICULTIES } from "../constants/questionTypes.js";
import { questionSchema } from "./Question.js";

const assessmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    topic: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: DIFFICULTIES, required: true },
    questions: { type: [questionSchema], default: [] },
    assessmentType: { type: String, enum: ASSESSMENT_TYPES, default: "TOPIC" },
    sourceSummary: { type: String, default: "" }
  },
  { timestamps: true }
);

export const Assessment = mongoose.model("Assessment", assessmentSchema);
