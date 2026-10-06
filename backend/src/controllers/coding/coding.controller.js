import { asyncHandler } from "../../utils/asyncHandler.js";
import { runCode } from "../../services/piston/piston.service.js";

export const run = asyncHandler(async (req, res) => {
  const result = await runCode(req.body);
  res.json({ success: true, result });
});

export const submit = asyncHandler(async (req, res) => {
  const result = await runCode(req.body);
  res.json({ success: true, result, message: "Code submitted and executed" });
});
