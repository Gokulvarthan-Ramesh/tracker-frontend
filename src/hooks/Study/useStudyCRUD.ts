// src/pages/Study/hooks/useStudyCRUD.ts
import { useState } from "react";

import { format } from "date-fns";
import type { StudySession } from "../../pages/Study/types/study.types";
import api from "../../services/api";

export function useStudyCRUD(onSuccess?: () => void) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editSession, setEditSession] = useState<StudySession | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const defaultForm = {
    subject: "",
    description: "",
    date: format(new Date(), "yyyy-MM-dd"),
    hours: 1,
    notes: "",
  };

  const [formData, setFormData] = useState(defaultForm);

  const openCreateModal = () => {
    setEditSession(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const openEditModal = (session: StudySession) => {
    setEditSession(session);
    setFormData({
      subject: session.subject,
      description: session.description,
      date: session.date,
      hours: session.hours,
      notes: session.notes,
    });
    setModalOpen(true);
  };

  const handleSave = async (sessionsSetter: React.Dispatch<React.SetStateAction<StudySession[]>>) => {
    try {
      const payload = { ...formData, hours: Number(formData.hours) };

      let res;
      if (editSession) {
        res = await api.put(`/study/${editSession.id}`, payload);
      } else {
        res = await api.post("/study", payload);
      }

      const saved = res.data?.data; // adjust path if needed

      sessionsSetter((prev) =>
        editSession
          ? prev.map((s) => (s.id === saved.id ? saved : s))
          : [saved, ...prev]
      );

      setModalOpen(false);
      onSuccess?.();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to save");
    }
  };

  const handleDelete = async (id: number, sessionsSetter: React.Dispatch<React.SetStateAction<StudySession[]>>) => {
    try {
      await api.delete(`/study/${id}`);
      sessionsSetter((prev) => prev.filter((s) => s.id !== id));
      setDeleteConfirmId(null);
      onSuccess?.();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete");
    }
  };

  return {
    modalOpen,
    setModalOpen,
    editSession,
    formData,
    setFormData,
    deleteConfirmId,
    setDeleteConfirmId,
    openCreateModal,
    openEditModal,
    handleSave,
    handleDelete,
  };
}