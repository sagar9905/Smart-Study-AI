import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { BarChart3, BrainCircuit, Code2, LayoutDashboard, LogOut, NotebookPen, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/assessment", label: "Assessments", icon: BrainCircuit },
  { to: "/coding", label: "Coding", icon: Code2 },
  { to: "/study-planner", label: "Study Plan", icon: NotebookPen },
  { to: "/analytics", label: "Analytics", icon: BarChart3 }
];

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-slate-200 bg-white md:block">
        <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-5">
          <ShieldCheck className="h-6 w-6 text-emerald-600" />
          <span className="text-lg font-semibold tracking-tight">SmartStudy AI</span>
        </div>
        <nav className="space-y-1 p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="md:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-8">
          <div>
            <p className="text-sm text-slate-500">AI-first adaptive learning workspace</p>
            <h1 className="text-base font-semibold text-slate-900">{user?.name || "Student"}</h1>
          </div>
          <button
            className="focus-ring inline-flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            onClick={() => {
              logout();
              navigate("/login");
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </header>
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
        <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-slate-200 bg-white md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex h-14 flex-col items-center justify-center gap-1 text-[11px] font-medium ${
                  isActive ? "text-emerald-700" : "text-slate-500"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
