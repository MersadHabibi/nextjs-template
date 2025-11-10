import { DateObject } from "react-multi-date-picker";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";

interface CalendarHeaderProps {
  currentMonth: DateObject;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export default function CalendarHeader({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  const isLg = useMediaQuery("(min-width: 1024px)");

  return (
    <div className="mb-4 flex flex-col items-center justify-between gap-3 lg:mb-6 lg:flex-row lg:gap-0">
      <div className="order-2 w-full lg:order-1 lg:w-full">
        <button
          onClick={onPrevMonth}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-sm transition-colors hover:bg-blue-50 lg:w-auto lg:justify-start lg:px-4 lg:text-base">
          <ChevronRightIcon className="size-4" />
          <span className="truncate">
            {new DateObject(currentMonth).subtract(1, "month").month.name}
          </span>
        </button>
      </div>

      <h2 className="order-1 shrink-0 text-lg font-bold text-gray-800 lg:order-2 lg:text-xl">
        تاریخ انتخاب کنید
      </h2>

      <div className="order-3 w-full lg:w-full">
        <button
          onClick={onNextMonth}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-sm transition-colors hover:bg-blue-50 lg:w-auto lg:justify-end lg:px-4 lg:text-base",
            "lg:mr-auto",
          )}>
          <span className="truncate">
            {new DateObject(currentMonth).add(isLg ? 2 : 1, "month").month.name}
          </span>
          <ChevronLeftIcon className="size-4" />
        </button>
      </div>
    </div>
  );
}
