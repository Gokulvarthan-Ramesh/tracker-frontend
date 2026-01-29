
import type { StudySession } from "../../pages/Study/types/study.types";
import StudySessionCard from "./StudySessionCard";

interface StudySessionListProps {
  sessions: StudySession[];
  loadingMore: boolean;
  hasMore: boolean;
  lastSessionRef: (node: HTMLDivElement | null) => void;
  onEdit: (session: StudySession) => void;
  onDelete: (id: number) => void;
}

export default function StudySessionList({
  sessions,
  loadingMore,
  hasMore,
  lastSessionRef,
  onEdit,
  onDelete,
}: StudySessionListProps) {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-white">
        Study Sessions {sessions.length > 0 && `(${sessions.length})`}
      </h2>

      {sessions.length === 0 ? (
        <div className="rounded-2xl border border-gray-800/50 bg-gray-900/60 p-12 text-center text-gray-300">
          No study sessions found. Add one or adjust filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session, index) => {
            const isLast = index === sessions.length - 1;
            return (
              <StudySessionCard
                key={session.id}
                session={session}
                onEdit={onEdit}
                onDelete={onDelete}
                isLast={isLast}
                refCallback={isLast && hasMore ? lastSessionRef : undefined}
              />
            );
          })}
        </div>
      )}

      {loadingMore && (
        <div className="py-10 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
        </div>
      )}
    </section>
  );
}