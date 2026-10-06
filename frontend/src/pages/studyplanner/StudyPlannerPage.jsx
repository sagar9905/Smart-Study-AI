import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { Input, Select } from "../../components/common/Input";
import { studyPlanService } from "../../services/studyPlanService";

export default function StudyPlannerPage() {
  const [form, setForm] = useState({ subjects: "DBMS, Operating Systems", difficultyLevel: "Medium", hoursPerDay: 3, examDate: "" });
  const [plan, setPlan] = useState(null);
  const mutation = useMutation({ mutationFn: studyPlanService.generate, onSuccess: setPlan });

  const submit = () => mutation.mutate({
    subjects: form.subjects.split(",").map((item) => item.trim()).filter(Boolean),
    difficultyLevel: form.difficultyLevel,
    hoursPerDay: Number(form.hoursPerDay),
    examDate: form.examDate
  });

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_minmax(0,1fr)]">
      <Card title="AI Study Plan Generator">
        <div className="space-y-4">
          <Input label="Subjects" value={form.subjects} onChange={(e) => setForm({ ...form, subjects: e.target.value })} />
          <Select label="Difficulty Level" value={form.difficultyLevel} onChange={(e) => setForm({ ...form, difficultyLevel: e.target.value })}>
            <option>Easy</option><option>Medium</option><option>Hard</option>
          </Select>
          <Input label="Hours Per Day" type="number" min="1" max="16" value={form.hoursPerDay} onChange={(e) => setForm({ ...form, hoursPerDay: e.target.value })} />
          <Input label="Exam Date" type="date" value={form.examDate} onChange={(e) => setForm({ ...form, examDate: e.target.value })} />
          <Button className="w-full" disabled={mutation.isPending || !form.examDate} onClick={submit}>Generate Plan</Button>
        </div>
      </Card>
      <Card title="Daily Schedule">
        <div className="space-y-3">
          {(plan?.dailyPlan || []).map((day) => (
            <div key={day.date} className="rounded-md border border-slate-200 p-3">
              <p className="font-semibold">{day.date} · {day.hours}h</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
                {day.tasks?.map((task) => <li key={task}>{task}</li>)}
              </ul>
            </div>
          ))}
          {!plan && <p className="text-sm text-slate-500">Your generated plan will appear here.</p>}
        </div>
      </Card>
    </div>
  );
}
