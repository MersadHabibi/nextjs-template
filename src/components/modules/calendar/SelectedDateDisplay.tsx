import { type DateObject } from "react-multi-date-picker";

interface SelectedDateDisplayProps {
  startDate: DateObject | null;
  endDate: DateObject | null;
  isRangeMode: boolean;
}

export default function SelectedDateDisplay({
  startDate,
  endDate,
  isRangeMode,
}: SelectedDateDisplayProps) {
  if (!startDate) return null;

  return (
    <div className="mb-4 rounded-lg bg-gray-50 p-3">
      <p className="text-start text-sm text-gray-600">
        {isRangeMode ? (
          endDate ? (
            <>
              <span className="font-medium">بازه انتخاب شده: </span>
              {startDate.format("DD MMMM YYYY")} تا{" "}
              {endDate.format("DD MMMM YYYY")}
            </>
          ) : (
            <>
              <span className="font-medium">تاریخ شروع: </span>
              {startDate.format("DD MMMM YYYY")}
              <span className="mr-2 text-blue-600">انتخاب تاریخ پایان</span>
            </>
          )
        ) : (
          <>
            <span className="font-medium">تاریخ انتخاب شده: </span>
            {startDate.format("DD MMMM YYYY")}
          </>
        )}
      </p>
    </div>
  );
}
