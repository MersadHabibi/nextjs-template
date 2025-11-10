import { ChevronUpIcon, ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useTransition, useRef } from "react";

interface TimePickerProps {
  hours: number;
  minutes: number;
  onHoursChange: (hours: number) => void;
  onMinutesChange: (minutes: number) => void;
}

export default function TimePicker({
  hours,
  minutes,
  onHoursChange,
  onMinutesChange,
}: TimePickerProps) {
  // Local state for input values to handle typing
  const [hoursInput, setHoursInput] = useState(hours.toString());
  const [minutesInput, setMinutesInput] = useState(minutes.toString());
  const [hoursFocused, setHoursFocused] = useState(false);
  const [minutesFocused, setMinutesFocused] = useState(false);
  const [, startTransition] = useTransition();
  const autoRepeatTimerRef = useRef<number | null>(null);
  const autoRepeatDelayTimerRef = useRef<number | null>(null);

  // Update local state when props change
  useEffect(() => {
    if (!hoursFocused) {
      setHoursInput(hours.toString());
    }
  }, [hours, hoursFocused]);

  useEffect(() => {
    if (!minutesFocused) {
      setMinutesInput(minutes.toString());
    }
  }, [minutes, minutesFocused]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoRepeatTimerRef.current) {
        window.clearInterval(autoRepeatTimerRef.current);
      }
      if (autoRepeatDelayTimerRef.current) {
        window.clearTimeout(autoRepeatDelayTimerRef.current);
      }
    };
  }, []);

  const stopAutoRepeat = () => {
    if (autoRepeatTimerRef.current) {
      window.clearInterval(autoRepeatTimerRef.current);
      autoRepeatTimerRef.current = null;
    }
    if (autoRepeatDelayTimerRef.current) {
      window.clearTimeout(autoRepeatDelayTimerRef.current);
      autoRepeatDelayTimerRef.current = null;
    }
  };

  const startAutoRepeat = (
    action: (entry: number) => void,
    actionType: "increment" | "decrement",
    entryType: "hours" | "minutes",
    entryValues: { hours?: number; minutes?: number },
  ) => {
    console.log(actionType, entryValues);
    let newMinutes =
      actionType === "increment"
        ? (entryValues.minutes || 0) >= 59
          ? 0
          : (entryValues.minutes || 0) + 1
        : (entryValues.minutes || 0) <= 0
          ? 59
          : (entryValues.minutes || 0) - 1;
    let newHours =
      actionType === "increment"
        ? (entryValues.hours || 0) >= 23
          ? 0
          : (entryValues.hours || 0) + 1
        : (entryValues.hours || 0) <= 0
          ? 23
          : (entryValues.hours || 0) - 1;

    // Perform one immediate step
    action(entryType === "hours" ? newHours : newMinutes);
    // After a short delay, start repeating faster
    autoRepeatDelayTimerRef.current = window.setTimeout(() => {
      autoRepeatTimerRef.current = window.setInterval(() => {
        newMinutes =
          actionType === "increment"
            ? (newMinutes || 0) >= 59
              ? 0
              : (newMinutes || 0) + 1
            : (newMinutes || 0) <= 0
              ? 59
              : (newMinutes || 0) - 1;
        newHours =
          actionType === "increment"
            ? (newHours || 0) >= 23
              ? 0
              : (newHours || 0) + 1
            : (newHours || 0) <= 0
              ? 23
              : (newHours || 0) - 1;
        console.log("action");
        action(entryType === "hours" ? newHours : newMinutes);
      }, 80);
    }, 300);
  };

  const incrementHours = (hours: number) => {
    const next = hours;
    setHoursInput(next.toString());
    startTransition(() => onHoursChange(next));
  };

  const decrementHours = (hours: number) => {
    const next = hours;
    setHoursInput(next.toString());
    startTransition(() => onHoursChange(next));
  };

  const incrementMinutes = (minutes: number) => {
    const next = minutes;
    setMinutesInput(next.toString());
    startTransition(() => onMinutesChange(next));
  };

  const decrementMinutes = (minutes: number) => {
    const next = minutes;
    setMinutesInput(next.toString());
    startTransition(() => onMinutesChange(next));
  };

  const handleHoursChange = (value: string) => {
    // Allow empty string while typing
    if (value === "") {
      setHoursInput("");
      return;
    }

    // Allow Latin, Arabic-Indic, and Persian digits
    const stripNonDigits = (input: string) =>
      input.replace(/[^0-9\u0660-\u0669\u06F0-\u06F9]/g, "");

    // Normalize Arabic/Persian digits to ASCII for parsing
    const normalizeToAsciiDigits = (input: string) =>
      input
        .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
        .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0));

    const rawDigits = stripNonDigits(value);

    // Limit to 2 digits
    if (rawDigits.length <= 2) {
      // Keep raw digits (may include Persian) for display while typing
      setHoursInput(rawDigits);

      // Parse and validate
      const parsedValue = parseInt(normalizeToAsciiDigits(rawDigits), 10);
      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 23) {
        startTransition(() => onHoursChange(parsedValue));
      }
    }
  };

  const handleMinutesChange = (value: string) => {
    // Allow empty string while typing
    if (value === "") {
      setMinutesInput("");
      return;
    }

    // Allow Latin, Arabic-Indic, and Persian digits
    const stripNonDigits = (input: string) =>
      input.replace(/[^0-9\u0660-\u0669\u06F0-\u06F9]/g, "");

    // Normalize Arabic/Persian digits to ASCII for parsing
    const normalizeToAsciiDigits = (input: string) =>
      input
        .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
        .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0));

    const rawDigits = stripNonDigits(value);

    // Limit to 2 digits
    if (rawDigits.length <= 2) {
      // Keep raw digits (may include Persian) for display while typing
      setMinutesInput(rawDigits);

      // Parse and validate
      const parsedValue = parseInt(normalizeToAsciiDigits(rawDigits), 10);
      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 59) {
        startTransition(() => onMinutesChange(parsedValue));
      }
    }
  };

  const handleHoursFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setHoursFocused(true);
    // Select all text when focused for easier editing
    e.target.select();
  };

  const handleHoursBlur = () => {
    setHoursFocused(false);
    // If empty or invalid, reset to current hours
    const normalizeToAsciiDigits = (input: string) =>
      input
        .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
        .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
    if (
      hoursInput === "" ||
      isNaN(parseInt(normalizeToAsciiDigits(hoursInput), 10))
    ) {
      setHoursInput(hours.toString());
    } else {
      const parsedValue = parseInt(normalizeToAsciiDigits(hoursInput), 10);
      if (parsedValue < 0 || parsedValue > 23) {
        setHoursInput(hours.toString());
      } else if (parsedValue !== hours) {
        startTransition(() => onHoursChange(parsedValue));
      }
    }
  };

  const handleMinutesFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setMinutesFocused(true);
    // Select all text when focused for easier editing
    e.target.select();
  };

  const handleMinutesBlur = () => {
    setMinutesFocused(false);
    // If empty or invalid, reset to current minutes
    const normalizeToAsciiDigits = (input: string) =>
      input
        .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660))
        .replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06f0));
    if (
      minutesInput === "" ||
      isNaN(parseInt(normalizeToAsciiDigits(minutesInput), 10))
    ) {
      setMinutesInput(minutes.toString());
    } else {
      const parsedValue = parseInt(normalizeToAsciiDigits(minutesInput), 10);
      if (parsedValue < 0 || parsedValue > 59) {
        setMinutesInput(minutes.toString());
      } else if (parsedValue !== minutes) {
        startTransition(() => onMinutesChange(parsedValue));
      }
    }
  };

  const timePresets = [
    { label: "09:00", h: 9, m: 0 },
    { label: "12:00", h: 12, m: 0 },
    { label: "14:00", h: 14, m: 0 },
    { label: "18:00", h: 18, m: 0 },
  ];

  return (
    <div className="mb-4 rounded-xl bg-linear-to-br from-blue-50 to-indigo-50 p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-center gap-2">
        <svg
          className="size-5 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
        <label className="text-sm font-semibold text-blue-900">
          انتخاب ساعت
        </label>
      </div>

      <div className="flex items-center justify-center gap-8">
        {/* Minutes */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onMouseDown={() =>
              startAutoRepeat(incrementMinutes, "increment", "minutes", {
                minutes,
              })
            }
            onMouseUp={stopAutoRepeat}
            onMouseLeave={stopAutoRepeat}
            onTouchStart={(e) => {
              e.preventDefault();
              startAutoRepeat(incrementMinutes, "increment", "minutes", {
                minutes,
              });
            }}
            onTouchEnd={stopAutoRepeat}
            onTouchCancel={stopAutoRepeat}
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md transition-all duration-200 hover:bg-blue-50 hover:shadow-lg focus:ring-2 focus:ring-blue-500/30 focus:outline-none active:scale-95">
            <ChevronUpIcon className="size-5 text-blue-600" />
          </button>
          <input
            type="text"
            value={
              minutesFocused ? minutesInput : minutesInput.padStart(2, "0")
            }
            onChange={(e) => handleMinutesChange(e.target.value)}
            onFocus={handleMinutesFocus}
            onBlur={handleMinutesBlur}
            className="flex h-16 w-20 items-center justify-center rounded-xl bg-white text-center text-2xl font-bold text-gray-800 shadow-md ring-1 ring-blue-100 transition-all duration-200 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
            maxLength={2}
            placeholder="00"
          />
          <button
            type="button"
            onMouseDown={() =>
              startAutoRepeat(decrementMinutes, "decrement", "minutes", {
                minutes,
              })
            }
            onMouseUp={stopAutoRepeat}
            onMouseLeave={stopAutoRepeat}
            onTouchStart={(e) => {
              e.preventDefault();
              startAutoRepeat(decrementMinutes, "decrement", "minutes", {
                minutes,
              });
            }}
            onTouchEnd={stopAutoRepeat}
            onTouchCancel={stopAutoRepeat}
            className="mt-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md transition-all duration-200 hover:bg-blue-50 hover:shadow-lg focus:ring-2 focus:ring-blue-500/30 focus:outline-none active:scale-95">
            <ChevronDownIcon className="size-5 text-blue-600" />
          </button>
          <span className="mt-2 text-sm font-medium text-blue-700">دقیقه</span>
        </div>

        {/* Separator */}
        <div className="pb-8 text-3xl font-bold text-blue-400">:</div>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <button
            type="button"
            onMouseDown={() =>
              startAutoRepeat(incrementHours, "increment", "hours", { hours })
            }
            onMouseUp={stopAutoRepeat}
            onMouseLeave={stopAutoRepeat}
            onTouchStart={(e) => {
              e.preventDefault();
              startAutoRepeat(incrementHours, "increment", "hours", { hours });
            }}
            onTouchEnd={stopAutoRepeat}
            onTouchCancel={stopAutoRepeat}
            className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md transition-all duration-200 hover:bg-blue-50 hover:shadow-lg focus:ring-2 focus:ring-blue-500/30 focus:outline-none active:scale-95">
            <ChevronUpIcon className="size-5 text-blue-600" />
          </button>
          <input
            type="text"
            value={hoursFocused ? hoursInput : hoursInput.padStart(2, "0")}
            onChange={(e) => handleHoursChange(e.target.value)}
            onFocus={handleHoursFocus}
            onBlur={handleHoursBlur}
            className="flex h-16 w-20 items-center justify-center rounded-xl bg-white text-center text-2xl font-bold text-gray-800 shadow-md ring-1 ring-blue-100 transition-all duration-200 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
            maxLength={2}
            placeholder="00"
          />
          <button
            type="button"
            onMouseDown={() =>
              startAutoRepeat(decrementHours, "decrement", "hours", { hours })
            }
            onMouseUp={stopAutoRepeat}
            onMouseLeave={stopAutoRepeat}
            onTouchStart={(e) => {
              e.preventDefault();
              startAutoRepeat(decrementHours, "decrement", "hours", { hours });
            }}
            onTouchEnd={stopAutoRepeat}
            onTouchCancel={stopAutoRepeat}
            className="mt-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md transition-all duration-200 hover:bg-blue-50 hover:shadow-lg focus:ring-2 focus:ring-blue-500/30 focus:outline-none active:scale-95">
            <ChevronDownIcon className="size-5 text-blue-600" />
          </button>
          <span className="mt-2 text-sm font-medium text-blue-700">ساعت</span>
        </div>
      </div>

      {/* Quick time presets */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-medium text-blue-700">انتخاب سریع:</span>
        {timePresets.map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => {
              onHoursChange(preset.h);
              onMinutesChange(preset.m);
            }}
            className={cn(
              "rounded-lg border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-700 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50",
              hours === preset.h &&
                minutes === preset.m &&
                "border-blue-600! bg-blue-600! text-white!",
            )}>
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}
