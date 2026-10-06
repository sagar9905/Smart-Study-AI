import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { generateAssessmentFromPdf } from "../../services/pdf/pdf.service.js";

export const uploadPdfAssessment = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "PDF file is required");
  const assessment = await generateAssessmentFromPdf({
    userId: req.user._id,
    fileBuffer: req.file.buffer,
    topic: req.body.topic,
    difficulty: req.body.difficulty || "Medium",
    numberOfQuestions: Number(req.body.numberOfQuestions || 10)
  });
  res.status(201).json({ success: true, assessment });
});
