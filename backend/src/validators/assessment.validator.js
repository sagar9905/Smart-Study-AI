import { z } from "zod";

export const generateAssessmentSchema = z.object({
  body: z.object({
    topic: z.string().min(2),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    numberOfQuestions: z.number().int().min(1).max(50),
    mix: z
      .object({
        mcq: z.number().int().min(0).optional(),
        subjective: z.number().int().min(0).optional(),
        coding: z.number().int().min(0).optional()
      })
      .optional()
  })
});

export const submitAssessmentSchema = z.object({
  body: z.object({
    assessmentId: z.string().min(1),
    answers: z.array(
      z.object({
        questionId: z.string().min(1),
        answer: z.any()
      })
    )
  })
});

export const evaluateTheorySchema = z.object({
  body: z.object({
    question: z.string().min(5),
    studentAnswer: z.string().min(1)
  })
});
