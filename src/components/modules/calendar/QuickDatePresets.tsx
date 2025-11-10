import { DateObject } from "react-multi-date-picker";

interface QuickDatePresetsProps {
  calendar: any;
  locale: any;
  onDateSelect: (date: DateObject) => void;
}

export default function QuickDatePresets({
  calendar,
  locale,
  onDateSelect,
}: QuickDatePresetsProps) {
  const presets = [
    { label: "یک ماه", months: 1 },
    { label: "سه ماه", months: 3 },
    { label: "شش ماه", months: 6 },
    { label: "یک سال", months: 12 },
  ];

  const handlePresetClick = (months: number) => {
    const today = new DateObject({ calendar, locale });
    const futureDate = new DateObject(today).add(months, "month");

    // Reset time to ensure clean date comparison
    const cleanFutureDate = new DateObject(futureDate)
      .setHour(0)
      .setMinute(0)
      .setSecond(0)
      .setMillisecond(0);

    onDateSelect(cleanFutureDate);
  };

  return (
    <div className="mb-6 rounded-lg bg-gray-50 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-center gap-2">
        <svg
          className="size-4 text-gray-600"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-sm font-medium text-gray-700">
          انتخاب سریع تاریخ
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
        {presets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => handlePresetClick(preset.months)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20">
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
