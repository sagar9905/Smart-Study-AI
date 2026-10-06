import pdfParse from "pdf-parse";
import { ApiError } from "../../utils/ApiError.js";
import { generateAssessment } from "../assessment/assessment.service.js";

export async function generateAssessmentFromPdf({ userId, fileBuffer, topic, difficulty, numberOfQuestions }) {
  const parsed = await pdfParse(fileBuffer);
  const sourceText = parsed.text?.trim();
  if (!sourceText) throw new ApiError(400, "Could not extract text from PDF");

  return generateAssessment({
    userId,
    topic: topic || "Uploaded PDF",
    difficulty,
    numberOfQuestions,
    assessmentType: "PDF",
    sourceText
  });
}
