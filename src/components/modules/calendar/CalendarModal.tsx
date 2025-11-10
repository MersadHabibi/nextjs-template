"use client";

import React, { useState, useCallback, useMemo } from "react";
import { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import {
  generateCalendarDays,
  convertToGregorianWithTehranTimezone,
  isFutureDate,
} from "./calendarUtils";
import { convertUTCToTehran } from "./timezone-utils";
import { createPortal } from "react-dom";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import QuickDatePresets from "./QuickDatePresets";
import TimePicker from "./TimePicker";
import SelectedDateDisplay from "./SelectedDateDisplay";
import CalendarActions from "./CalendarActions";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDateSelect: (selectedDate: string, endDate?: string | undefined) => void;
  initialDate?: string;
  initialEndDate?: string;
  isRangeMode?: boolean;
  showTimePicker?: boolean;
}

export default function CalendarModal({
  isOpen,
  onClose,
  onDateSelect,
  initialDate,
  initialEndDate,
  isRangeMode = false,
  showTimePicker = false,
}: CalendarModalProps) {
  // Get calendar and locale based on language
  const { calendar, locale } = useMemo(() => {
    return { calendar: persian, locale: persian_fa };
  }, []);

  // Current displayed month (first month)
  const [currentMonth, setCurrentMonth] = useState(
    () => new DateObject({ calendar, locale }),
  );

  // Update current month when language changes
  React.useEffect(() => {
    setCurrentMonth(new DateObject({ calendar, locale }));
  }, [calendar, locale]);

  // Selected dates
  const [startDate, setStartDate] = useState<DateObject | null>(
    initialDate ? new DateObject(initialDate).convert(calendar, locale) : null,
  );
  const [endDate, setEndDate] = useState<DateObject | null>(
    initialEndDate
      ? new DateObject(initialEndDate).convert(calendar, locale)
      : null,
  );

  // Time states - initialize from initial date if provided
  const [hours, setHours] = useState(() => {
    if (initialDate) {
      // Convert UTC to Tehran time for display
      const tehranDate = convertUTCToTehran(initialDate);
      return tehranDate ? tehranDate.getUTCHours() : 9;
    }
    return 9;
  });
  const [minutes, setMinutes] = useState(() => {
    if (initialDate) {
      // Convert UTC to Tehran time for display
      const tehranDate = convertUTCToTehran(initialDate);
      return tehranDate ? tehranDate.getUTCMinutes() : 0;
    }
    return 0;
  });

  // Update selected dates when language changes
  React.useEffect(() => {
    if (initialDate) {
      setStartDate(new DateObject(initialDate).convert(calendar, locale));
      // Also update time when initial date changes
      const tehranDate = convertUTCToTehran(initialDate);
      if (tehranDate) {
        setHours(tehranDate.getUTCHours());
        setMinutes(tehranDate.getUTCMinutes());
      }
    }
    if (initialEndDate) {
      setEndDate(new DateObject(initialEndDate).convert(calendar, locale));
    }
  }, [calendar, locale, initialDate, initialEndDate]);

  // Get next month
  const nextMonth = new DateObject(currentMonth).add(1, "month");

  // Generate calendar days for both months
  const currentMonthDays = generateCalendarDays(currentMonth);
  const nextMonthDays = generateCalendarDays(nextMonth);

  // Navigation handlers
  const goToPrevMonth = () => {
    setCurrentMonth((prev) => new DateObject(prev).subtract(1, "month"));
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => new DateObject(prev).add(1, "month"));
  };

  // Handle quick date preset selection
  const handleQuickDateSelect = (selectedDate: DateObject) => {
    setStartDate(selectedDate);
    setEndDate(null);
    setCurrentMonth(new DateObject(selectedDate));
  };

  // Date selection handler
  const handleDateClick = useCallback(
    (date: DateObject) => {
      // Only allow future dates
      if (!isFutureDate(date)) return;

      // Normalize the date to remove time components for consistent comparison
      const normalizedDate = new DateObject(date)
        .setHour(0)
        .setMinute(0)
        .setSecond(0)
        .setMillisecond(0);

      if (isRangeMode) {
        // Range mode logic
        if (!startDate || (startDate && endDate)) {
          setStartDate(normalizedDate);
          setEndDate(null);
        } else {
          // If start date exists but no end date
          if (normalizedDate.valueOf() >= startDate.valueOf()) {
            setEndDate(normalizedDate);
          } else {
            // If clicked date is before start date, make it the new start date
            setStartDate(normalizedDate);
            setEndDate(null);
          }
        }
      } else {
        // Single date mode
        setStartDate(normalizedDate);
        setEndDate(null);
      }
    },
    [isRangeMode, startDate, endDate],
  );

  // Check if date is in selected range
  const isInRange = useCallback(
    (date: DateObject) => {
      if (!isRangeMode || !startDate || !endDate) return false;
      const dateValue = date.valueOf();
      return dateValue >= startDate.valueOf() && dateValue <= endDate.valueOf();
    },
    [isRangeMode, startDate, endDate],
  );

  // Check if date is start or end of selection
  const isRangeStart = useCallback(
    (date: DateObject) => {
      if (!startDate) return false;
      // Compare only date parts (year, month, day) without time
      return (
        date.year === startDate.year &&
        date.month.number === startDate.month.number &&
        date.day === startDate.day
      );
    },
    [startDate],
  );

  const isRangeEnd = useCallback(
    (date: DateObject) => {
      if (!endDate) return false;
      // Compare only date parts (year, month, day) without time
      return (
        date.year === endDate.year &&
        date.month.number === endDate.month.number &&
        date.day === endDate.day
      );
    },
    [endDate],
  );

  // Check if date is selected (for single date mode)
  const isSelected = useCallback(
    (date: DateObject) => {
      if (!startDate) return false;
      // Compare only date parts (year, month, day) without time
      return (
        date.year === startDate.year &&
        date.month.number === startDate.month.number &&
        date.day === startDate.day
      );
    },
    [startDate],
  );

  // Confirm selection
  const handleConfirm = () => {
    if (startDate) {
      let startISO = convertToGregorianWithTehranTimezone(startDate);
      let endISO: string | undefined = undefined;

      // Add time if time picker is enabled
      if (showTimePicker) {
        const startDateWithTime = new DateObject(startDate)
          .setHour(hours)
          .setMinute(minutes);
        startISO = convertToGregorianWithTehranTimezone(startDateWithTime);

        // If range mode and end date exists, add time to end date too
        if (isRangeMode && endDate) {
          const endDateWithTime = new DateObject(endDate)
            .setHour(hours)
            .setMinute(minutes);
          endISO = convertToGregorianWithTehranTimezone(endDateWithTime);
        }
      } else if (isRangeMode && endDate) {
        endISO = convertToGregorianWithTehranTimezone(endDate);
      }

      onDateSelect(startISO, endISO);
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      dir="rtl"
      className="fixed inset-0 z-70 flex h-full items-start justify-center overflow-y-auto bg-black/20 p-4 py-5"
      onClick={() => onClose()}>
      <div
        className="w-full max-w-4xl rounded-2xl bg-white p-4 lg:p-6"
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
        }}>
        {/* Header with navigation */}
        <CalendarHeader
          currentMonth={currentMonth}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
        />

        {/* Dual month view */}
        <div className="mt-6 mb-6 flex flex-col gap-6 lg:mt-10 lg:flex-row lg:gap-8">
          <CalendarGrid
            monthDate={currentMonth}
            days={currentMonthDays}
            isRangeMode={isRangeMode}
            startDate={startDate}
            endDate={endDate}
            isSelected={isSelected}
            isRangeStart={isRangeStart}
            isRangeEnd={isRangeEnd}
            isInRange={isInRange}
            onDateClick={handleDateClick}
          />

          {/* Divider */}
          <div className="hidden w-px bg-gray-300 lg:block" />

          {/* Show second month only on large screens */}
          <div className="hidden flex-1 lg:block">
            <CalendarGrid
              monthDate={nextMonth}
              days={nextMonthDays}
              isRangeMode={isRangeMode}
              startDate={startDate}
              endDate={endDate}
              isSelected={isSelected}
              isRangeStart={isRangeStart}
              isRangeEnd={isRangeEnd}
              isInRange={isInRange}
              onDateClick={handleDateClick}
            />
          </div>
        </div>

        {/* Quick date presets */}
        <QuickDatePresets
          calendar={calendar}
          locale={locale}
          onDateSelect={handleQuickDateSelect}
        />

        {/* Selected date(s) display */}
        <SelectedDateDisplay
          startDate={startDate}
          endDate={endDate}
          isRangeMode={isRangeMode}
        />

        {/* Time picker */}
        {showTimePicker && startDate && (
          <TimePicker
            hours={hours}
            minutes={minutes}
            onHoursChange={setHours}
            onMinutesChange={setMinutes}
          />
        )}

        {/* Action buttons */}
        <CalendarActions
          onConfirm={handleConfirm}
          onCancel={onClose}
          isConfirmDisabled={!startDate || (isRangeMode && !endDate)}
        />
      </div>
    </div>,
    document.body,
  );
}
