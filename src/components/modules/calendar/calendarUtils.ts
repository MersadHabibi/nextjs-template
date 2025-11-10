import DateObject from "react-date-object";
import gregorian from "react-date-object/calendars/gregorian";
import gregorian_en from "react-date-object/locales/gregorian_en";

/**
 * تبدیل تاریخ شمسی به میلادی با منطقه زمانی تهران (UTC+3:30)
 * این تابع تاریخ محلی تهران را به UTC تبدیل می‌کند تا برای بک‌اند ارسال شود
 *
 * @param persianDate - تاریخ شمسی برای تبدیل
 * @returns تاریخ میلادی با فرمت ISO UTC برای ارسال به بک‌اند
 */
export const convertToGregorianWithTehranTimezone = (
  persianDate: DateObject,
): string => {
  // کپی از تاریخ اصلی برای جلوگیری از تغییر آن
  const dateCopy = new DateObject(persianDate);

  // تبدیل به تقویم میلادی با حفظ ساعت و دقیقه و ثانیه
  const gregorianDate = dateCopy.convert(gregorian, gregorian_en);

  // ایجاد Date object به صورت UTC (بدون تبدیل تایم‌زون خودکار)
  // استفاده از Date.UTC برای ایجاد تاریخ UTC
  const utcTimestamp = Date.UTC(
    gregorianDate.year,
    gregorianDate.month.number - 1, // JavaScript months are 0-indexed
    gregorianDate.day,
    gregorianDate.hour,
    gregorianDate.minute,
    gregorianDate.second,
    gregorianDate.millisecond,
  );

  // حالا باید 3.5 ساعت کم کنیم چون کاربر ساعت تهران را انتخاب کرده
  // اما ما آن را به عنوان UTC در نظر گرفتیم
  const tehranOffsetMs = 3.5 * 60 * 60 * 1000;
  const correctedUtcTimestamp = utcTimestamp - tehranOffsetMs;

  // ایجاد Date object از timestamp اصلاح شده
  const utcDate = new Date(correctedUtcTimestamp);

  // برگرداندن فرمت ISO UTC
  return utcDate.toISOString();
};

/**
 * بررسی می‌کند که آیا تاریخ داده شده در آینده است (امروز یا بعد از امروز)
 *
 * @param date - تاریخ مورد بررسی
 * @returns آیا تاریخ در آینده است یا خیر
 */
export const isFutureDate = (date: DateObject): boolean => {
  // ایجاد یک تاریخ جدید برای امروز با همان تقویم و زبان تاریخ ورودی
  const today = new DateObject({
    calendar: date.calendar,
    locale: date.locale,
  });

  // تنظیم ساعت، دقیقه و ثانیه به صفر برای هر دو تاریخ برای مقایسه درست
  today.setHour(0).setMinute(0).setSecond(0).setMillisecond(0);
  const dateToCompare = new DateObject(date)
    .setHour(0)
    .setMinute(0)
    .setSecond(0)
    .setMillisecond(0);

  // مقایسه تاریخ‌ها: اگر تاریخ مورد نظر بزرگتر یا مساوی امروز باشد، یعنی در آینده است
  return dateToCompare.valueOf() >= today.valueOf();
};

/**
 * Generates an array of DateObjects representing all days to be displayed in the calendar
 *
 * @param date - The current date (DateObject with any calendar)
 * @returns An array of DateObjects for the calendar grid
 */
export const generateCalendarDays = (date: DateObject): DateObject[] => {
  // Get current month and year (works with any calendar)
  const year = date.year;
  const month = date.month.number;
  const calendar = date.calendar;
  const locale = date.locale;

  // Create a date object for the first day of the month
  const firstDay = new DateObject({
    calendar: calendar,
    locale: locale,
    year: year,
    month: month,
    day: 1,
  });

  // Get day of the week for the first day (0 = Saturday in Persian calendar, 1 = Sunday, etc.)
  const firstDayOfWeek = firstDay.weekDay.index;

  // Get the number of days in the current month
  const daysInMonth = firstDay.month.length;

  // Get the number of days in the previous month
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const prevMonthLength = new DateObject({
    calendar: calendar,
    locale: locale,
    year: prevYear,
    month: prevMonth,
    day: 1,
  }).month.length;

  const days: DateObject[] = [];

  // Add previous month's days to fill the first row
  for (let i = 0; i < firstDayOfWeek; i++) {
    const day = prevMonthLength - firstDayOfWeek + i + 1;
    days.push(
      new DateObject({
        calendar: calendar,
        locale: locale,
        year: prevYear,
        month: prevMonth,
        day: day,
      }),
    );
  }

  // Add current month's days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(
      new DateObject({
        calendar: calendar,
        locale: locale,
        year: year,
        month: month,
        day: i,
      }),
    );
  }

  // Calculate how many rows we need based on first day of week and days in month
  // Then add only enough days from next month to complete the last row
  const totalDaysSoFar = firstDayOfWeek + daysInMonth;
  const rowsNeeded = Math.ceil(totalDaysSoFar / 7);
  const cellsNeeded = rowsNeeded * 7;
  const remainingDays = cellsNeeded - totalDaysSoFar;

  // Add next month's days to fill just the remaining cells in the last row
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  for (let i = 1; i <= remainingDays; i++) {
    days.push(
      new DateObject({
        calendar: calendar,
        locale: locale,
        year: nextYear,
        month: nextMonth,
        day: i,
      }),
    );
  }

  return days;
};

/**
 * Checks if the given date is in the current month
 *
 * @param date - The date to check
 * @param currentDate - The reference date for the current month
 * @returns boolean indicating if the date is in the current month
 */
export const isCurrentMonth = (
  date: DateObject,
  currentDate: DateObject,
): boolean => {
  return (
    date.month.number === currentDate.month.number &&
    date.year === currentDate.year
  );
};

/**
 * Checks if the given date is today
 *
 * @param date - The date to check
 * @returns boolean indicating if the date is today
 */
export const isToday = (date: DateObject): boolean => {
  const today = new DateObject({
    calendar: date.calendar,
    locale: date.locale,
  });
  return (
    date.day === today.day &&
    date.month.number === today.month.number &&
    date.year === today.year
  );
};

/**
 * Object containing all Iranian holidays with their names
 * Key format: "MM/DD" for recurring annual holidays
 * Key format: "YYYY/MM/DD" for specific one-time holidays
 */
const HOLIDAY_MAP: Record<string, string> = {
  // تعطیلات مناسبتی در تقویم شمسی (نوروز و...)
  "01/01": "عید نوروز",
  "01/02": "عید نوروز",
  "01/03": "عید نوروز",
  "01/04": "عید نوروز",
  "01/13": "روز طبیعت (سیزده بدر)",
  "03/14": "رحلت امام خمینی",
  "03/15": "قیام 15 خرداد",
  "11/22": "پیروزی انقلاب اسلامی",
  "12/29": "ملی شدن صنعت نفت",

  // برخی از تعطیلات مذهبی ثابت شمسی
  "08/28": "رحلت پیامبر و شهادت امام حسن",
  "10/08": "شهادت امام رضا",

  // می‌توان تعطیلات خاص هر سال را به صورت کامل اضافه کرد
  "1403/01/01": "عید نوروز",
  "1403/01/02": "عید نوروز",
  "1403/01/03": "عید نوروز",
  "1403/01/04": "عید نوروز",
};

/**
 * Checks if the given date is a holiday (Friday or official holiday)
 * Only works for Persian calendar
 *
 * @param date - The date to check
 * @returns object with isHoliday boolean and the holiday name if applicable
 */
export const isHoliday = (
  date: DateObject,
): { isHoliday: boolean; name?: string } => {
  // Check if it's Persian calendar, otherwise return false
  if (date.calendar?.name !== "persian") {
    // For Gregorian and Arabic calendars, mark Friday and Saturday as weekend
    if (date.weekDay.index === 5 || date.weekDay.index === 6) {
      return {
        isHoliday: true,
        name: date.weekDay.index === 5 ? "Friday" : "Saturday",
      };
    }
    return { isHoliday: false };
  }

  // جمعه‌ها تعطیل رسمی هستند (شاخص 6 در تقویم فارسی)
  if (date.weekDay.index === 6) {
    return { isHoliday: true, name: "جمعه" };
  }

  // بررسی تعطیلات سالانه تکرار شونده (بدون سال)
  const monthDay = `${date.month.number.toString().padStart(2, "0")}/${date.day.toString().padStart(2, "0")}`;

  // بررسی تعطیلات خاص با سال
  const fullDate = `${date.year}/${monthDay}`;

  // اگر در تعطیلات سالانه بود
  if (HOLIDAY_MAP[monthDay]) {
    return { isHoliday: true, name: HOLIDAY_MAP[monthDay] };
  }

  // اگر در تعطیلات خاص سال بود
  if (HOLIDAY_MAP[fullDate]) {
    return { isHoliday: true, name: HOLIDAY_MAP[fullDate] };
  }

  return { isHoliday: false };
};

/**
 * تبدیل تاریخ ISO string (UTC) به تایم زون تهران برای نمایش
 * @param isoString - تاریخ به فرمت ISO UTC (مثل: "2024-01-15T10:30:00.000Z")
 * @returns تاریخ تبدیل شده به تایم زون تهران به فرمت ISO برای نمایش
 */
export const convertToTehranTimezone = (isoString: string): string => {
  if (!isoString) return "";

  try {
    // ایجاد Date object از ISO string (UTC)
    const utcDate = new Date(isoString);

    // اضافه کردن 3.5 ساعت برای تبدیل UTC به تهران
    const tehranDate = new Date(utcDate.getTime() + 3.5 * 60 * 60 * 1000);

    // برگرداندن فرمت ISO (اما در واقع زمان محلی تهران است)
    return tehranDate.toISOString();
  } catch (error) {
    console.error("Error converting to Tehran timezone:", error);
    return isoString; // در صورت خطا، همان مقدار اصلی را برگردان
  }
};

/**
 * محاسبه تعداد روزهای بین دو تاریخ
 * @param startDate - تاریخ شروع (ISO string)
 * @param endDate - تاریخ پایان (ISO string)
 * @returns تعداد روزها
 */
export const calculateDaysBetween = (
  startDate: string,
  endDate: string,
): number => {
  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);
  const end = new Date(endDate);

  // محاسبه تفاوت به میلی‌ثانیه
  const diffTime = Math.abs(end.getTime() - start.getTime());

  // تبدیل به روز (شامل روز شروع و پایان)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  return diffDays;
};
