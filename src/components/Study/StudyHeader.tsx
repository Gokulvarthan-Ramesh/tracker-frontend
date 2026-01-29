import { format } from "date-fns";
import type { StudySession } from "../../pages/Study/types/study.types";
import { BiPlus } from "react-icons/bi";


interface StudyHeaderProps {
  sessions: StudySession[];
  onAddNew: () => void;
}

export default function StudyHeader({ sessions, onAddNew }: StudyHeaderProps) {
  const totalSessions = sessions.length;
  const totalHours = sessions.reduce((sum, s) => sum + s.hours, 0);
  const latestDate = sessions.length > 0 
    ? format(new Date(sessions[0].date), "dd MMM yyyy") 
    : null;

  const hasData = totalSessions > 0;

  return (
    <div className="mb-8 md:mb-10">
      <div 
        className={`
          relative overflow-hidden rounded-2xl 
          bg-gradient-to-br from-gray-900 via-gray-950 to-black 
          border border-gray-800/60 
          p-6 sm:p-8 shadow-xl shadow-black/40
          backdrop-blur-sm
        `}
      >
        {/* Subtle background accent */}
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/8 via-transparent to-transparent pointer-events-none" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Left side - Title & Stats */}
          <div className="space-y-2">
            <h1 
              className="
                text-3xl sm:text-4xl md:text-5xl 
                font-extrabold tracking-tight 
                bg-gradient-to-r from-white via-gray-100 to-violet-300 
                bg-clip-text text-transparent
              "
            >
              Study Dashboard
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm sm:text-base">
              <div className="flex items-center gap-1.5 text-gray-300">
                <span className="font-semibold text-violet-400">{totalSessions}</span>
                <span>session{totalSessions !== 1 ? "s" : ""}</span>
              </div>

              <div className="flex items-center gap-1.5 text-gray-300">
                <span className="font-semibold text-violet-400">{totalHours}</span>
                <span>hour{totalHours !== 1 ? "s" : ""} logged</span>
              </div>

              {hasData && latestDate && (
                <div className="flex items-center gap-1.5 text-gray-400 italic">
                  <span className="text-gray-500">Latest:</span>
                  <time>{latestDate}</time>
                </div>
              )}
            </div>
          </div>

          {/* Right side - CTA Button */}
          <button
            onClick={onAddNew}
            type="button"
            className={`
              group relative flex items-center justify-center gap-2
              rounded-xl bg-gradient-to-r from-violet-600 to-violet-700
              px-6 py-3 font-medium text-white
              shadow-lg shadow-violet-900/40
              hover:from-violet-500 hover:to-violet-600
              hover:shadow-xl hover:shadow-violet-700/40
              focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:ring-offset-2 focus:ring-offset-gray-950
              active:scale-[0.97]
              transition-all duration-200
            `}
          >
            <BiPlus 
              size={20} 
              className="transition-transform duration-200 group-hover:rotate-90" 
            />
            <span>New Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}