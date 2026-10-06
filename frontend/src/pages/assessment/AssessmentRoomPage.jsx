import { useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { Textarea } from "../../components/common/Input";
import QuestionNavigator from "../../components/assessment/QuestionNavigator";
import { assessmentService } from "../../services/assessmentService";

export default function AssessmentRoomPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const assessment = state?.assessment;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const submitMutation = useMutation({
    mutationFn: assessmentService.submit,
    onSuccess: () => navigate("/analytics")
  });

  const question = assessment?.questions?.[currentIndex];
  const progress = useMemo(() => Object.keys(answers).length, [answers]);

  if (!assessment?.questions) {
    return <Card title="Assessment unavailable"><p className="text-sm text-slate-500">Open a generated assessment from the history list.</p></Card>;
  }

  const setAnswer = (value) => setAnswers({ ...answers, [question._id]: value });
  const submit = () => submitMutation.mutate({
    assessmentId: assessment._id,
    answers: Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer }))
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <Card title={`Progress ${progress}/${assessment.questions.length}`}>
        <QuestionNavigator questions={assessment.questions} currentIndex={currentIndex} onSelect={setCurrentIndex} answers={answers} />
      </Card>
      <Card title={`${question.questionType} · ${question.topic || assessment.topic}`}>
        <div className="space-y-4">
          <h1 className="text-xl font-semibold">{question.questionTitle}</h1>
          {question.problemDescription && <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{question.problemDescription}</p>}
          {question.questionType === "MCQ" && (
            <div className="space-y-2">
              {question.options.map((option) => (
                <label key={option} className="flex cursor-pointer gap-3 rounded-md border border-slate-200 p-3 hover:bg-slate-50">
                  <input type="radio" name={question._id} checked={answers[question._id] === option} onChange={() => setAnswer(option)} />
                  <span className="text-sm">{option}</span>
                </label>
              ))}
            </div>
          )}
          {question.questionType === "SUBJECTIVE" && (
            <div>
              <Textarea label="Answer" value={answers[question._id] || ""} onChange={(e) => setAnswer(e.target.value)} />
              <p className="mt-1 text-xs text-slate-500">{String(answers[question._id] || "").trim().split(/\s+/).filter(Boolean).length} words</p>
            </div>
          )}
          {question.questionType === "CODING" && (
            <div className="rounded-md border border-slate-200 bg-slate-50 p-4 text-sm">
              Open the Coding workspace to run Java or C++ in Monaco with Piston execution.
            </div>
          )}
          <div className="flex justify-between gap-3">
            <Button variant="secondary" disabled={currentIndex === 0} onClick={() => setCurrentIndex(currentIndex - 1)}>Previous</Button>
            {currentIndex < assessment.questions.length - 1 ? (
              <Button onClick={() => setCurrentIndex(currentIndex + 1)}>Next</Button>
            ) : (
              <Button onClick={submit} disabled={submitMutation.isPending}>Submit Assessment</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
