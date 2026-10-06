import axios from "axios";
import { ApiError } from "../../utils/ApiError.js";

const runtimeMap = {
  java: { language: "java", version: "15.0.2", filename: "Main.java" },
  cpp: { language: "cpp", version: "10.2.0", filename: "main.cpp" }
};

export async function runCode({ language, code, stdin = "" }) {
  const runtime = runtimeMap[language];
  if (!runtime) throw new ApiError(400, "Unsupported language");

  const baseUrl = process.env.PISTON_API_URL || "https://emkc.org/api/v2/piston";
  const { data } = await axios.post(`${baseUrl}/execute`, {
    language: runtime.language,
    version: runtime.version,
    files: [{ name: runtime.filename, content: code }],
    stdin
  });

  return {
    stdout: data.run?.stdout || "",
    stderr: data.run?.stderr || data.compile?.stderr || "",
    executionTime: data.run?.time || null,
    memoryUsage: data.run?.memory || null,
    raw: data
  };
}
