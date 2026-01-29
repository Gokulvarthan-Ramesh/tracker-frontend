
interface FormActionsProps {
    onCancel: () => void;
    onSave: () => void;
    isSaveDisabled: boolean;
    isEditing: boolean;
    className?: string;
    cancelText?: string;
    saveText?: string;
}

export default function FormActions({
    onCancel,
    onSave,
    isSaveDisabled,
    isEditing,
    className = "",
    cancelText = "Cancel",
    saveText,
}: FormActionsProps) {
    const finalSaveText = saveText ?? (isEditing ? "Update" : "Create");

    return (
        <div
            className={`
        mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4
        ${className}
      `}
        >
            <button
                type="button"
                onClick={onCancel}
                className={`
          rounded-xl border border-gray-600 
          bg-gray-700/80 px-5 py-2.5 
          text-sm font-medium text-gray-200 
          hover:bg-gray-600 hover:text-white 
          focus:outline-none focus:ring-2 focus:ring-gray-500/40 
          active:scale-[0.98] transition-all duration-150
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
            >
                {cancelText}
            </button>

            <button
                type="button"
                onClick={onSave}
                disabled={isSaveDisabled}
                className={`
          rounded-xl bg-violet-600 px-6 py-2.5 
          text-sm font-medium text-white 
          hover:bg-violet-700 hover:shadow-md hover:shadow-violet-500/20 
          focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:ring-offset-2 focus:ring-offset-gray-900
          disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-violet-600 disabled:hover:shadow-none
          active:scale-[0.98] transition-all duration-150
        `}
            >
                {finalSaveText}
            </button>
        </div>
    );
}