import { z } from "zod";

export const studyPlanSchema = z.object({
  body: z.object({
    subjects: z.array(z.string().min(2)).min(1),
    difficultyLevel: z.enum(["Easy", "Medium", "Hard"]),
    hoursPerDay: z.number().min(1).max(16),
    examDate: z.string().datetime().or(z.string().date())
  })
});
