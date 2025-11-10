import { type DateObject } from "react-multi-date-picker";
import { cn } from "@/lib/utils";
import {
  isCurrentMonth,
  isToday,
  isFutureDate,
  isHoliday,
} from "./calendarUtils";

interface CalendarDayProps {
  date: DateObject;
  monthRef: DateObject;
  isRangeMode: boolean;
  isSelected: boolean;
  isRangeStart: boolean;
  isRangeEnd: boolean;
  isInRange: boolean;
  startDate: DateObject | null;
  endDate: DateObject | null;
  onClick: (date: DateObject) => void;
}

export default function CalendarDay({
  date,
  monthRef,
  isRangeMode,
  isSelected,
  isRangeStart,
  isRangeEnd,
  isInRange,
  startDate,
  endDate,
  onClick,
}: CalendarDayProps) {
  const isPast = !isFutureDate(date);
  const isCurrentMonthDay = isCurrentMonth(date, monthRef);
  const isTodayDate = isToday(date);
  const holiday = isHoliday(date);

  let dayClasses =
    "h-8 lg:h-10 w-8 lg:w-10 flex items-center z-[1] justify-center rounded-full text-sm cursor-pointer transition-colors border border-transparent ";

  // Base styling
  if (!isCurrentMonthDay) {
    dayClasses += "text-gray-300 ";
  } else if (isPast) {
    dayClasses += "!text-gray-300 cursor-not-allowed ";
  } else {
    dayClasses += "text-gray-700 hover:bg-gray-100 ";
  }

  // Today styling
  if (isTodayDate && isCurrentMonthDay) {
    dayClasses += "font-bold border-blue-500 ";
  }

  // Selection styling
  if (isRangeMode) {
    if (
      isRangeStart &&
      isRangeEnd &&
      startDate?.valueOf() === endDate?.valueOf()
    ) {
      // Single day selection in range mode
      dayClasses += "!bg-primary font-bold rounded-lg ";
    } else if (isRangeStart) {
      dayClasses += "!bg-primary text-white font-bold hover:!bg-primary/80";
    } else if (isRangeEnd) {
      dayClasses += "!bg-primary text-white font-bold hover:!bg-primary/80";
    } else if (isInRange) {
      dayClasses += "!bg-primary/15 !w-full rounded-none hover:!bg-primary/25";
    }
  } else {
    // Single date mode
    if (isSelected && isCurrentMonthDay) {
      dayClasses += "!bg-primary text-white font-bold hover:!bg-primary/80 ";
    }
  }

  return (
    <div
      key={date.format("YYYY/MM/DD")}
      className={cn(
        "relative flex size-10 items-center justify-center lg:size-12",
        !isCurrentMonthDay && "invisible",
      )}>
      {/* Range background for range mode */}
      {isRangeMode && (
        <div
          className={cn(
            "absolute inset-0 my-auto flex w-full items-center justify-center",
            isCurrentMonthDay &&
              isRangeStart &&
              endDate &&
              `bg-primary/15! mr-auto h-8 w-3/4 rounded-r-full lg:h-10`,
            isCurrentMonthDay &&
              isRangeEnd &&
              `bg-primary/15! ml-auto h-8 w-3/4 rounded-l-full lg:h-10`,
          )}
        />
      )}
      <button
        className={dayClasses}
        onClick={() => onClick(date)}
        disabled={isPast || !isCurrentMonthDay}
        title={holiday.isHoliday ? holiday.name : undefined}>
        {date.day}
      </button>
    </div>
  );
}
