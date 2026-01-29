// src/pages/Study/components/SessionModal.tsx
import React from "react";
import type { StudySession } from "../../pages/Study/types/study.types";
import TextInputField from "../Fields/TextInputField";
import FormActions from "../Actions/FormActions";


interface SessionModalProps {
    open: boolean;
    onClose: () => void;
    editSession: StudySession | null;
    formData: {
        subject: string;
        description: string;
        date: string;
        hours: number;
        notes: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            subject: string;
            description: string;
            date: string;
            hours: number;
            notes: string;
        }>
    >;
    onSave: () => void;
}

export default function SessionModal({
    open,
    onClose,
    editSession,
    formData,
    setFormData,
    onSave,
}: SessionModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-lg rounded-2xl border border-gray-700 bg-gray-900 p-6">
                <h2 className="mb-5 text-2xl font-bold text-white">
                    {editSession ? "Edit Study Session" : "New Study Session"}
                </h2>

                <div className="space-y-4">
                    <TextInputField
                        label="Subject"
                        required
                        value={formData.subject}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, subject: e.target.value }))
                        }
                        className="w-full"
                        placeholder="Subject *"
                    />
                    <TextInputField
                        label="Description"
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full"
                        placeholder="Description"
                    />

                    <TextInputField
                        label="Date"
                        type="date"
                        value={formData.date}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, date: e.target.value }))
                        }
                        className="w-full"
                    />


                    <TextInputField
                        label="Hours"
                        type="number"
                        value={formData.hours}
                        onChange={(e) =>
                            setFormData((prev) => ({ ...prev, hours: Number(e.target.value) }))
                        }
                        min={0.5}
                        step={0.5}
                        required
                        className="w-full"
                    />
                    <TextInputField
                        label="Notes (optional)"
                        value={formData.notes}
                        onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                        className="w-full"
                        placeholder="notes"
                    />

                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <FormActions
                        onCancel={onClose}
                        onSave={onSave}
                        isSaveDisabled={!formData.subject.trim() || formData.hours <= 0}
                        isEditing={!!editSession}
                        cancelText="Discard"
                        saveText="Save Session"
                        className="px-2 sm:px-0"
                    />
                </div>
            </div>
        </div>
    );
}