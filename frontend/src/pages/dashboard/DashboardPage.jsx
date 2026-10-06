import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import MetricCard from "../../components/dashboard/MetricCard";
import { analyticsService } from "../../services/analyticsService";

export default function DashboardPage() {
  const { data } = useQuery({ queryKey: ["student-analytics"], queryFn: analyticsService.student });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-slate-950">Learning Dashboard</h1>
          <p className="text-sm text-slate-500">Generate AI assessments, identify weak areas, and keep momentum visible.</p>
        </div>
        <Link to="/assessment"><Button>Generate Assessment</Button></Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Assessments" value={data?.totalAssessments ?? 0} />
        <MetricCard label="Average Score" value={`${data?.averageScore ?? 0}%`} />
        <MetricCard label="Coding Success" value={`${data?.codingSuccessRate ?? 0}%`} />
        <MetricCard label="Theory Score" value={`${data?.theoryScore ?? 0}%`} />
      </div>
      <Card title="Weak Topics">
        <div className="flex flex-wrap gap-2">
          {(data?.weakTopics?.length ? data.weakTopics : [{ topic: "No weak topics yet", averageScore: 0 }]).map((item) => (
            <span key={item.topic} className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800">{item.topic}</span>
          ))}
        </div>
      </Card>
    </div>
  );
}
