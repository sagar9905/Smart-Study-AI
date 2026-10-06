import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import { Input, Select } from "../../components/common/Input";
import { assessmentService } from "../../services/assessmentService";

export default function AssessmentGeneratorPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ topic: "DBMS", difficulty: "Medium", numberOfQuestions: 10 });
  const [pdf, setPdf] = useState(null);
  const { data: history = [] } = useQuery({ queryKey: ["assessments"], queryFn: assessmentService.history });
  const generateMutation = useMutation({ mutationFn: assessmentService.generate, onSuccess: (assessment) => navigate(`/assessment/${assessment._id}`, { state: { assessment } }) });
  const adaptiveMutation = useMutation({ mutationFn: assessmentService.generateAdaptive, onSuccess: (assessment) => navigate(`/assessment/${assessment._id}`, { state: { assessment } }) });
  const pdfMutation = useMutation({ mutationFn: assessmentService.uploadPdf, onSuccess: (assessment) => navigate(`/assessment/${assessment._id}`, { state: { assessment } }) });

  const generateFromPdf = () => {
    const data = new FormData();
    data.append("pdf", pdf);
    data.append("topic", form.topic);
    data.append("difficulty", form.difficulty);
    data.append("numberOfQuestions", form.numberOfQuestions);
    pdfMutation.mutate(data);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <Card title="AI Assessment Generator">
        <div className="grid gap-4 md:grid-cols-3">
          <Input label="Topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} />
          <Select label="Difficulty" value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value })}>
            <option>Easy</option><option>Medium</option><option>Hard</option>
          </Select>
          <Input label="Questions" type="number" min="1" max="50" value={form.numberOfQuestions} onChange={(e) => setForm({ ...form, numberOfQuestions: Number(e.target.value) })} />
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button disabled={generateMutation.isPending} onClick={() => generateMutation.mutate(form)}>Generate</Button>
          <Button variant="dark" disabled={adaptiveMutation.isPending} onClick={() => adaptiveMutation.mutate({ difficulty: form.difficulty, numberOfQuestions: form.numberOfQuestions })}>Adaptive</Button>
        </div>
      </Card>
      <Card title="PDF to Assessment">
        <input className="focus-ring w-full rounded-md border border-slate-300 p-2 text-sm" type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files?.[0])} />
        <Button className="mt-4 w-full" variant="secondary" disabled={!pdf || pdfMutation.isPending} onClick={generateFromPdf}>Generate from PDF</Button>
      </Card>
      <Card title="History" className="lg:col-span-2">
        <div className="divide-y divide-slate-100">
          {history.map((assessment) => (
            <button key={assessment._id} className="flex w-full items-center justify-between py-3 text-left" onClick={() => navigate(`/assessment/${assessment._id}`, { state: { assessment } })}>
              <span>
                <span className="block font-medium">{assessment.topic}</span>
                <span className="text-sm text-slate-500">{assessment.assessmentType} · {assessment.difficulty}</span>
              </span>
              <span className="text-sm text-slate-500">{new Date(assessment.createdAt).toLocaleDateString()}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
