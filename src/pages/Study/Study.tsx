// src/pages/Study/StudyPage.tsx
import { useState } from "react";

import { useStudyData } from "../../hooks/Study/useStudyData";
import { useStudyCRUD } from "../../hooks/Study/useStudyCRUD";
import StudyFilters from "../../components/Study/StudyFilters";
import StudyStats from "../../components/Study/StudyStats";
import StudySessionList from "../../components/Study/StudySessionList";
import type { StudyFilter } from "./types/study.types";

import StudyHeader from "../../components/Study/StudyHeader";
import SessionModal from "../../components/Study/SessionModal";
import DeleteConfirmModal from "../../components/Modals/DeleteConfirmModal";


const StudyPage = () => {
  const [filters, setFilters] = useState<StudyFilter>({
    search: "",
    sortBy: "date",
    order: "desc",
    dateFrom: "",
    dateTo: "",
    minHours: "",
    maxHours: "",
  });

  const {
    sessions,
    setSessions,
    loading,
    loadingMore,
    error,
    hasMore,
    lastSessionRef,
  } = useStudyData(filters);

  const crud = useStudyCRUD();

  if (loading && sessions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 to-slate-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
          <p className="text-lg text-gray-300">Loading study sessions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-950 to-slate-950 p-6">
        <div className="max-w-md rounded-2xl border border-red-800/50 bg-gray-900/80 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-red-400">Error</h2>
          <p className="mb-6 text-gray-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-xl bg-violet-600 px-6 py-3 text-white hover:bg-violet-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-950 to-slate-950 p-6 text-gray-100">
      <StudyHeader
        sessions={sessions}
        onAddNew={crud.openCreateModal}
      />

      <StudyFilters
        filters={filters}
        setFilters={setFilters}
      />

      <StudyStats
        sessions={sessions}
      />

      <StudySessionList
        sessions={sessions}
        loadingMore={loadingMore}
        hasMore={hasMore}
        lastSessionRef={lastSessionRef}
        onEdit={crud.openEditModal}
        onDelete={(id) => crud.setDeleteConfirmId(id)}
      />

      <SessionModal
        open={crud.modalOpen}
        onClose={() => crud.setModalOpen(false)}
        editSession={crud.editSession}
        formData={crud.formData}
        setFormData={crud.setFormData}
        onSave={() => crud.handleSave(setSessions)}           // ← now works
      />

      <DeleteConfirmModal
        open={!!crud.deleteConfirmId}
        onClose={() => crud.setDeleteConfirmId(null)}
        onConfirm={() => crud.handleDelete(crud.deleteConfirmId!, setSessions)}
      />
    </div>
  );
};

export default StudyPage;