
import axios from "axios";
import { ApiError } from "../../utils/ApiError.js";

const languageMap = {
  java: 62,
  cpp: 54
};

const judge0 = axios.create({
  baseURL: (
    process.env.JUDGE0_API_URL || "https://ce.judge0.com"
  ).replace(/\/+$/, ""),
  timeout: 15000
});

export async function runCode({ language, code, stdin = "" }) {
  const languageId = languageMap[language];

  if (!languageId) {
    throw new ApiError(400, "Unsupported language");
  }

  if (typeof code !== "string" || !code.trim()) {
    throw new ApiError(400, "Code is required");
  }

  try {
    // Create a submission.
    const { data: submission } = await judge0.post(
      "/submissions?base64_encoded=false&wait=false",
      {
        source_code: code,
        language_id: languageId,
        stdin
      }
    );

    if (!submission?.token) {
      throw new Error("Judge0 did not return a submission token");
    }

    // Poll until execution completes.
    const maxAttempts = 20;
    let result = null;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await judge0.get(
        `/submissions/${encodeURIComponent(submission.token)}?base64_encoded=false`
      );

      result = response.data;

      // Status 1 = In Queue, 2 = Processing.
      if (result.status?.id > 2) break;
    }

    if (!result || result.status?.id <= 2) {
      throw new ApiError(
        504,
        "Code execution timed out. Please try again."
      );
    }

    return {
      stdout: result.stdout || "",
      stderr:
        result.stderr ||
        result.compile_output ||
        result.message ||
        "",
      executionTime: result.time
        ? Number(result.time)
        : null,
      memoryUsage: result.memory ?? null,
      raw: result
    };
  } catch (error) {
    if (error instanceof ApiError) throw error;

    console.error(
      "Judge0 execution failed:",
      error.response?.data || error.message
    );

    throw new ApiError(
      502,
      "Code execution service failed. Please try again."
    );
  }
}