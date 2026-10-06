import { asyncHandler } from "../../utils/asyncHandler.js";
import { getAdminAnalytics, getStudentAnalytics } from "../../services/analytics/analytics.service.js";

export const student = asyncHandler(async (req, res) => {
  const analytics = await getStudentAnalytics(req.user._id);
  res.json({ success: true, analytics });
});

export const admin = asyncHandler(async (_req, res) => {
  const analytics = await getAdminAnalytics();
  res.json({ success: true, analytics });
});
