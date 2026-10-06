import { getStudentAnalytics } from "./analytics.service.js";
import { generateAssessment } from "../assessment/assessment.service.js";

export async function generateAdaptiveAssessment({ userId, difficulty = "Medium", numberOfQuestions = 15 }) {
  const analytics = await getStudentAnalytics(userId);
  const weakTopics = analytics.weakTopics.map((item) => item.topic).slice(0, 5);
  const topic = weakTopics.length ? weakTopics.join(", ") : "General revision";

  return generateAssessment({
    userId,
    topic,
    difficulty,
    numberOfQuestions,
    assessmentType: "ADAPTIVE"
  });
}
