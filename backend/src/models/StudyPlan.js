import mongoose from "mongoose";

const studyPlanSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    subjects: [{ type: String, required: true }],
    difficultyLevel: { type: String, required: true },
    hoursPerDay: { type: Number, required: true },
    examDate: { type: Date, required: true },
    dailyPlan: { type: [mongoose.Schema.Types.Mixed], default: [] },
    weeklySchedule: { type: [mongoose.Schema.Types.Mixed], default: [] },
    revisionPlan: { type: [mongoose.Schema.Types.Mixed], default: [] },
    priorityRanking: { type: [mongoose.Schema.Types.Mixed], default: [] },
    progress: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const StudyPlan = mongoose.model("StudyPlan", studyPlanSchema);
