import { StudyPlan } from "../../models/StudyPlan.js";
import { generateJson } from "../gemini/gemini.service.js";
import { studyPlanPrompt } from "../gemini/prompts.js";

export async function generateStudyPlan({ userId, subjects, difficultyLevel, hoursPerDay, examDate }) {
  const plan = await generateJson(studyPlanPrompt({ subjects, difficultyLevel, hoursPerDay, examDate }));
  return StudyPlan.create({
    userId,
    subjects,
    difficultyLevel,
    hoursPerDay,
    examDate,
    dailyPlan: plan.dailyPlan || [],
    weeklySchedule: plan.weeklySchedule || [],
    revisionPlan: plan.revisionPlan || [],
    priorityRanking: plan.priorityRanking || []
  });
}
