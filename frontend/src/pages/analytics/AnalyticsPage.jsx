import { useQuery } from "@tanstack/react-query";
import Card from "../../components/common/Card";
import MetricCard from "../../components/dashboard/MetricCard";
import { analyticsService } from "../../services/analyticsService";
import { useAuth } from "../../context/AuthContext";

export default function AnalyticsPage() {
  const { user } = useAuth();
  const { data: student } = useQuery({ queryKey: ["student-analytics"], queryFn: analyticsService.student });
  const { data: admin } = useQuery({ queryKey: ["admin-analytics"], queryFn: analyticsService.admin, enabled: user?.role === "admin" });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total Assessments" value={student?.totalAssessments ?? 0} />
        <MetricCard label="Average Score" value={`${student?.averageScore ?? 0}%`} />
        <MetricCard label="Coding Success" value={`${student?.codingSuccessRate ?? 0}%`} />
        <MetricCard label="Theory Score" value={`${student?.theoryScore ?? 0}%`} />
      </div>
      <Card title="Topic Wise Performance">
        <div className="space-y-3">
          {(student?.topicWisePerformance || []).map((item) => (
            <div key={item.topic}>
              <div className="mb-1 flex justify-between text-sm"><span>{item.topic}</span><span>{item.averageScore}%</span></div>
              <div className="h-2 rounded bg-slate-100"><div className="h-2 rounded bg-emerald-600" style={{ width: `${item.averageScore}%` }} /></div>
            </div>
          ))}
        </div>
      </Card>
      {admin && (
        <Card title="Admin Analytics">
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard label="Users" value={admin.totalUsers} />
            <MetricCard label="AI Assessments" value={admin.totalAssessmentsGenerated} />
            <MetricCard label="Active Students" value={admin.activeStudents} />
          </div>
        </Card>
      )}
    </div>
  );
}
