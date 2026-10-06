import { Assessment } from "../../models/Assessment.js";
import { Submission } from "../../models/Submission.js";
import { User } from "../../models/User.js";

function topicBuckets(submissions) {
  const buckets = new Map();
  submissions.forEach((submission) => {
    submission.answers.forEach((answer) => {
      const topic = answer.topic || "General";
      const bucket = buckets.get(topic) || { topic, total: 0, count: 0 };
      bucket.total += answer.score || 0;
      bucket.count += 1;
      buckets.set(topic, bucket);
    });
  });

  return [...buckets.values()].map((item) => ({
    topic: item.topic,
    averageScore: Math.round(item.total / Math.max(item.count, 1))
  }));
}

export async function getStudentAnalytics(userId) {
  const [assessments, submissions] = await Promise.all([
    Assessment.find({ userId }),
    Submission.find({ userId }).sort({ submittedAt: 1 })
  ]);

  const averageScore = Math.round(submissions.reduce((sum, item) => sum + item.score, 0) / Math.max(submissions.length, 1));
  const topicPerformance = topicBuckets(submissions);
  const weakTopics = topicPerformance.filter((item) => item.averageScore < 60).sort((a, b) => a.averageScore - b.averageScore);
  const strongTopics = topicPerformance.filter((item) => item.averageScore >= 75).sort((a, b) => b.averageScore - a.averageScore);
  const codingAnswers = submissions.flatMap((item) => item.answers).filter((answer) => answer.questionType === "CODING");
  const theoryAnswers = submissions.flatMap((item) => item.answers).filter((answer) => answer.questionType === "SUBJECTIVE");

  return {
    totalAssessments: assessments.length,
    averageScore,
    codingSuccessRate: Math.round(codingAnswers.filter((answer) => answer.score >= 70).length * 100 / Math.max(codingAnswers.length, 1)),
    theoryScore: Math.round(theoryAnswers.reduce((sum, answer) => sum + answer.score, 0) / Math.max(theoryAnswers.length, 1)),
    improvementTrend: submissions.map((item) => ({ date: item.submittedAt, score: item.score })),
    topicWisePerformance: topicPerformance,
    weakTopics,
    strongTopics
  };
}

export async function getAdminAnalytics() {
  const [totalUsers, totalAssessmentsGenerated, activeStudents, aiUsageByType] = await Promise.all([
    User.countDocuments(),
    Assessment.countDocuments(),
    Submission.distinct("userId"),
    Assessment.aggregate([{ $group: { _id: "$assessmentType", count: { $sum: 1 } } }])
  ]);

  return {
    totalUsers,
    totalAssessmentsGenerated,
    activeStudents: activeStudents.length,
    aiUsageStatistics: aiUsageByType.map((item) => ({ type: item._id, count: item.count }))
  };
}
