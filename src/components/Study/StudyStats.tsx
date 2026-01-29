import type { StudySession } from "../../pages/Study/types/study.types";


interface StudyStatsProps {
  sessions: StudySession[];
}

export default function StudyStats({ sessions }: StudyStatsProps) {
  const totalSessions = sessions.length;
  const totalHours = sessions.reduce((sum, s) => sum + s.hours, 0);
  const currentMonthSessions = sessions.filter(
    (s) => new Date(s.date).getMonth() === new Date().getMonth()
  ).length;
  const longestSession = sessions.length > 0 ? Math.max(...sessions.map((s) => s.hours)) : 0;

  const stats = [
    { label: "Sessions", value: totalSessions, color: "text-white" },
    { label: "Total Hours", value: totalHours, color: "text-emerald-400" },
    { label: "This Month", value: currentMonthSessions, color: "text-blue-400" },
    { label: "Longest", value: `${longestSession} hrs`, color: "text-violet-400" },
  ];

  return (
    <div className="mb-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="rounded-2xl border border-gray-800/50 bg-gray-900/60 p-5 text-center transition hover:bg-gray-800/70"
        >
          <div className="text-sm text-gray-400">{stat.label}</div>
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  );
}