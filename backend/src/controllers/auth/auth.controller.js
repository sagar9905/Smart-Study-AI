import { asyncHandler } from "../../utils/asyncHandler.js";
import { loginUser, registerUser } from "../../services/auth/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const session = await registerUser(req.body);
  res.status(201).json({ success: true, ...session });
});

export const login = asyncHandler(async (req, res) => {
  const session = await loginUser(req.body);
  res.json({ success: true, ...session });
});

export const logout = asyncHandler(async (_req, res) => {
  res.json({ success: true, message: "Logged out. Remove token on client." });
});
