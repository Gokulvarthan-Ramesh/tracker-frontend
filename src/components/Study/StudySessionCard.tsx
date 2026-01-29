import { format } from "date-fns";
import type { StudySession } from "../../pages/Study/types/study.types";

interface StudySessionCardProps {
  session: StudySession;
  onEdit: (session: StudySession) => void;
  onDelete: (id: number) => void;
  isLast?: boolean;
  refCallback?: (node: HTMLDivElement | null) => void;
}

export default function StudySessionCard({
  session,
  onEdit,
  onDelete,
  isLast = false,
  refCallback,
}: StudySessionCardProps) {
  const hasNotes = !!session.notes?.trim();

  return (
    <div
      ref={refCallback}
      className={`
        group relative overflow-hidden rounded-2xl 
        bg-white/5 backdrop-blur-xl border border-white/10
        shadow-xl shadow-black/20
        transition-all duration-300 ease-out
        hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/10
        hover:border-violet-500/30
        active:scale-[0.99]
      `}
    >
      {/* Optional subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3
            className={`
              text-xl font-semibold tracking-tight text-white 
              group-hover:text-violet-300 transition-colors
              line-clamp-2
            `}
          >
            {session.subject}
          </h3>

          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => onEdit(session)}
              className={`
                rounded-lg px-3.5 py-1.5 text-sm font-medium
                bg-violet-900/40 text-violet-200
                hover:bg-violet-800/60 hover:text-white
                focus:outline-none focus:ring-2 focus:ring-violet-500/40
                transition-all duration-200
              `}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(session.id)}
              className={`
                rounded-lg px-3.5 py-1.5 text-sm font-medium
                bg-red-900/40 text-red-200
                hover:bg-red-800/60 hover:text-white
                focus:outline-none focus:ring-2 focus:ring-red-500/40
                transition-all duration-200
              `}
            >
              Delete
            </button>
          </div>
        </div>

        <p
          className={`
            mb-4 text-gray-300 leading-relaxed line-clamp-3
            group-hover:line-clamp-none transition-all duration-300
          `}
        >
          {session.description || "No description provided."}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <time className="text-gray-400">
            {format(new Date(session.date), "dd MMM yyyy")}
          </time>

          <span className="font-medium text-violet-400">
            {session.hours} {session.hours === 1 ? "hr" : "hrs"}
          </span>

          {hasNotes && (
            <span className="italic text-gray-500/90 max-w-[180px] truncate">
              "{session.notes}"
            </span>
          )}
        </div>
      </div>
    </div>
  );
}