import { type DateObject } from "react-multi-date-picker";
import { useMemo } from "react";
import CalendarDay from "./CalendarDay";

interface CalendarGridProps {
  monthDate: DateObject;
  days: DateObject[];
  isRangeMode: boolean;
  startDate: DateObject | null;
  endDate: DateObject | null;
  isSelected: (date: DateObject) => boolean;
  isRangeStart: (date: DateObject) => boolean;
  isRangeEnd: (date: DateObject) => boolean;
  isInRange: (date: DateObject) => boolean;
  onDateClick: (date: DateObject) => void;
}

export default function CalendarGrid({
  monthDate,
  days,
  isRangeMode,
  startDate,
  endDate,
  isSelected,
  isRangeStart,
  isRangeEnd,
  isInRange,
  onDateClick,
}: CalendarGridProps) {
  // Get week days based on language (outside of render function)
  const weekDays = useMemo(() => {
    return ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  }, []);

  return (
    <div className="flex-1">
      {/* Month header */}
      <div className="mb-3 text-center lg:mb-4">
        <h3 className="text-base font-semibold text-gray-800 lg:text-lg">
          {monthDate.month.name} {monthDate.year}
        </h3>
      </div>

      {/* Week days header */}
      <div className="mx-auto mb-2 grid w-fit grid-cols-7">
        {weekDays.map((day) => (
          <div
            key={day.toString() + monthDate.month.name}
            className="flex h-6 w-10 items-center justify-center text-xs font-medium text-gray-500 lg:h-8 lg:w-12 lg:text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="mx-auto grid w-fit grid-cols-7">
        {days.map((date) => (
          <CalendarDay
            key={date.format("YYYY/MM/DD")}
            date={date}
            monthRef={monthDate}
            isRangeMode={isRangeMode}
            isSelected={isSelected(date)}
            isRangeStart={isRangeStart(date)}
            isRangeEnd={isRangeEnd(date)}
            isInRange={isInRange(date)}
            startDate={startDate}
            endDate={endDate}
            onClick={onDateClick}
          />
        ))}
      </div>
    </div>
  );
}
