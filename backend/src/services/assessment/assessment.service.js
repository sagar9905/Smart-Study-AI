import { Assessment } from "../../models/Assessment.js";
import { Submission } from "../../models/Submission.js";
import { TheoryEvaluation } from "../../models/TheoryEvaluation.js";
import { ApiError } from "../../utils/ApiError.js";
import { generateJson } from "../gemini/gemini.service.js";
import { assessmentPrompt, theoryEvaluationPrompt } from "../gemini/prompts.js";

function normalizeQuestions(questions = [], fallbackDifficulty) {
  return questions.map((question) => ({
    questionType: question.questionType,
    questionTitle: question.questionTitle,
    problemDescription: question.problemDescription || "",
    options: question.questionType === "MCQ" ? question.options || [] : [],
    correctOption: question.questionType === "MCQ" ? question.correctOption || "" : "",
    sampleInput: question.sampleInput || "",
    sampleOutput: question.sampleOutput || "",
    starterCode: question.starterCode || "",
    difficulty: question.difficulty || fallbackDifficulty,
    topic: question.topic || ""
  }));
}

export async function generateAssessment({ userId, topic, difficulty, numberOfQuestions, mix, assessmentType = "TOPIC", sourceText = "" }) {
  const aiAssessment = await generateJson(assessmentPrompt({ topic, difficulty, numberOfQuestions, mix, sourceText }));
  const questions = normalizeQuestions(aiAssessment.questions, difficulty);

  if (!questions.length) throw new ApiError(502, "AI did not generate any questions");

  return Assessment.create({
    userId,
    topic: aiAssessment.topic || topic,
    difficulty: aiAssessment.difficulty || difficulty,
    questions,
    assessmentType,
    sourceSummary: aiAssessment.sourceSummary || ""
  });
}

export async function listAssessments(userId) {
  return Assessment.find({ userId }).sort({ createdAt: -1 }).select("-questions.correctOption");
}

export async function submitAssessment({ userId, assessmentId, answers }) {
  const assessment = await Assessment.findOne({ _id: assessmentId, userId });
  if (!assessment) throw new ApiError(404, "Assessment not found");

  const answerMap = new Map(answers.map((item) => [String(item.questionId), item.answer]));
  const evaluatedAnswers = assessment.questions.map((question) => {
    const answer = answerMap.get(String(question._id));
    const isMcqCorrect = question.questionType === "MCQ" && answer === question.correctOption;
    return {
      questionId: question._id,
      questionType: question.questionType,
      answer: answer ?? "",
      score: question.questionType === "MCQ" ? (isMcqCorrect ? 100 : 0) : 0,
      feedback: question.questionType === "MCQ" ? { correctOption: question.correctOption } : { status: "AI evaluation recommended" },
      topic: question.topic || assessment.topic
    };
  });

  const score = Math.round(evaluatedAnswers.reduce((sum, item) => sum + item.score, 0) / Math.max(evaluatedAnswers.length, 1));
  return Submission.create({
    userId,
    assessmentId,
    answers: evaluatedAnswers,
    score,
    feedback: { summary: "MCQ answers scored automatically. Subjective and coding answers can be evaluated independently." }
  });
}

export async function evaluateTheoryAnswer({ userId, question, studentAnswer }) {
  const evaluation = await generateJson(theoryEvaluationPrompt({ question, studentAnswer }));
  return TheoryEvaluation.create({
    userId,
    question,
    studentAnswer,
    score: evaluation.score || 0,
    strengths: evaluation.strengths || [],
    weaknesses: evaluation.weaknesses || [],
    suggestions: evaluation.suggestions || [],
    improvementAreas: evaluation.improvementAreas || [],
    feedbackSummary: evaluation.feedbackSummary || ""
  });
}
