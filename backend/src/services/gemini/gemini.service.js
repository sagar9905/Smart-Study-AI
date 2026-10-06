import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../../utils/ApiError.js";

function getModel() {
  if (!process.env.GEMINI_API_KEY) throw new ApiError(500, "GEMINI_API_KEY is not configured");
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-1.5-flash" });
}

function extractJson(text) {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1) throw new ApiError(502, "AI response did not contain JSON");
  return JSON.parse(cleaned.slice(start, end + 1));
}

export async function generateJson(prompt) {
  try {
    const model = getModel();
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return extractJson(text);
  } catch (error) {
    const message = error.message || "Gemini request failed";
    throw new ApiError(502, `Gemini API error: ${message}`);
  }
}
