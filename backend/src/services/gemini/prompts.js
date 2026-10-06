export function assessmentPrompt({ topic, difficulty, numberOfQuestions, mix, sourceText = "" }) {
  return `
You are SmartStudy AI. Generate an adaptive assessment as strict JSON only.
No markdown. No explanations outside JSON. Never reuse manually supplied questions.

Requirements:
- Topic: ${topic}
- Difficulty: ${difficulty}
- Total questions: ${numberOfQuestions}
- Mix preference: ${JSON.stringify(mix || { mcq: "balanced", subjective: "balanced", coding: "balanced" })}
- Include MCQ, SUBJECTIVE, and CODING questions when suitable.
- Coding questions must support Java and C++ starterCode guidance.
- JSON shape:
{
  "topic": "string",
  "difficulty": "Easy|Medium|Hard",
  "sourceSummary": "string",
  "questions": [
    {
      "questionType": "MCQ|SUBJECTIVE|CODING",
      "questionTitle": "string",
      "problemDescription": "string",
      "options": ["A", "B", "C", "D"],
      "correctOption": "exact option text for MCQ only",
      "sampleInput": "string",
      "sampleOutput": "string",
      "starterCode": "string",
      "difficulty": "Easy|Medium|Hard",
      "topic": "specific subtopic"
    }
  ]
}

Source content, if provided:
${sourceText.slice(0, 18000)}
`;
}

export function theoryEvaluationPrompt({ question, studentAnswer }) {
  return `
Evaluate this theory answer as strict JSON only.
Return:
{
  "score": number from 0 to 100,
  "strengths": ["string"],
  "weaknesses": ["string"],
  "suggestions": ["string"],
  "improvementAreas": ["string"],
  "feedbackSummary": "string"
}
Question: ${question}
Student answer: ${studentAnswer}
`;
}

export function studyPlanPrompt({ subjects, difficultyLevel, hoursPerDay, examDate }) {
  return `
Create a personalized study plan as strict JSON only.
Inputs:
- Subjects: ${subjects.join(", ")}
- Difficulty level: ${difficultyLevel}
- Hours per day: ${hoursPerDay}
- Exam date: ${examDate}
Return:
{
  "dailyPlan": [{"date":"YYYY-MM-DD","tasks":["string"],"hours":number}],
  "weeklySchedule": [{"week":"string","goals":["string"]}],
  "revisionPlan": [{"phase":"string","tasks":["string"]}],
  "priorityRanking": [{"subject":"string","priority":number,"reason":"string"}]
}
`;
}
