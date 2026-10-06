import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateStudyPlan } from "../../services/studyplan/studyplan.service.js";

export const generate = asyncHandler(async (req, res) => {
  const plan = await generateStudyPlan({ userId: req.user._id, ...req.body });
  res.status(201).json({ success: true, plan });
});
