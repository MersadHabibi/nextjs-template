interface CalendarActionsProps {
  onConfirm: () => void;
  onCancel: () => void;
  isConfirmDisabled: boolean;
}

export default function CalendarActions({
  onConfirm,
  onCancel,
  isConfirmDisabled,
}: CalendarActionsProps) {
  return (
    <div className="flex flex-col justify-start gap-3 sm:flex-row">
      <button
        onClick={onConfirm}
        disabled={isConfirmDisabled}
        className="w-full rounded-lg bg-primary px-6 py-2.5 text-sm text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto lg:py-2 lg:text-base">
        تایید
      </button>
      <button
        onClick={onCancel}
        className="w-full rounded-lg border border-gray-300 px-6 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 sm:w-auto lg:py-2 lg:text-base">
        انصراف
      </button>
    </div>
  );
}
