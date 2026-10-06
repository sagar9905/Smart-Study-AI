import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateAdaptiveAssessment } from "../../services/analytics/adaptive.service.js";
import { evaluateTheoryAnswer, generateAssessment, listAssessments, submitAssessment } from "../../services/assessment/assessment.service.js";

export const generate = asyncHandler(async (req, res) => {
  const assessment = await generateAssessment({ userId: req.user._id, ...req.body });
  res.status(201).json({ success: true, assessment });
});

export const history = asyncHandler(async (req, res) => {
  const assessments = await listAssessments(req.user._id);
  res.json({ success: true, assessments });
});

export const submit = asyncHandler(async (req, res) => {
  const submission = await submitAssessment({ userId: req.user._id, ...req.body });
  res.status(201).json({ success: true, submission });
});

export const evaluateTheory = asyncHandler(async (req, res) => {
  const evaluation = await evaluateTheoryAnswer({ userId: req.user._id, ...req.body });
  res.json({ success: true, evaluation });
});

export const adaptive = asyncHandler(async (req, res) => {
  const assessment = await generateAdaptiveAssessment({ userId: req.user._id, ...req.body });
  res.status(201).json({ success: true, assessment });
});
