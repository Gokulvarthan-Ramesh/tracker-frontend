import React from "react";

interface DeleteConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sessionSubject?: string; // optional – show what is being deleted
}

export default function DeleteConfirmModal({
  open,
  onClose,
  onConfirm,
  sessionSubject = "this session",
}: DeleteConfirmModalProps) {
  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose} // close on backdrop click
    >
      {/* Stop propagation so clicks inside modal don't close it */}
      <div 
        className={`
          relative w-full max-w-md transform scale-100 transition-all duration-200
          rounded-2xl border border-red-900/30 bg-gradient-to-b from-gray-900 to-gray-950
          p-6 shadow-2xl shadow-red-950/30 backdrop-blur-md
        `}
        onClick={e => e.stopPropagation()}
      >
        {/* Optional subtle warning icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
          <svg 
            className="h-7 w-7 text-red-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h3 className="mb-3 text-center text-xl font-semibold text-red-400">
          Delete {sessionSubject}?
        </h3>

        <p className="mb-8 text-center text-gray-300 leading-relaxed">
          This action is permanent and cannot be undone.
        </p>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onClose}
            className={`
              rounded-xl border border-gray-700 
              bg-gray-800/70 px-6 py-2.5 text-sm font-medium text-gray-200
              hover:bg-gray-700 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-gray-500/40
              active:scale-[0.98] transition-all duration-150
            `}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`
              rounded-xl bg-gradient-to-r from-red-600 to-red-700 
              px-7 py-2.5 text-sm font-medium text-white
              hover:from-red-700 hover:to-red-800 hover:shadow-lg hover:shadow-red-900/40
              focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:ring-offset-2 focus:ring-offset-gray-950
              active:scale-[0.98] transition-all duration-150
            `}
          >
            Delete Permanently
          </button>
        </div>

        {/* Optional micro copy for extra clarity */}
        <p className="mt-5 text-center text-xs text-gray-500">
          All related data will be removed from your account.
        </p>
      </div>
    </div>
  );
}