import { User } from "../../models/User.js";
import { ApiError } from "../../utils/ApiError.js";
import { signToken } from "../../utils/token.js";

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, role: user.role };
}

export async function registerUser({ name, email, password, role }) {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(409, "Email is already registered");

  const user = await User.create({ name, email, password, role });
  return { token: signToken(user), user: publicUser(user) };
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  return { token: signToken(user), user: publicUser(user) };
}
