import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import CalendarModal from "./CalendarModal";

const meta = {
  title: "Components/CalendarModal",
  component: CalendarModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    isRangeMode: {
      control: "boolean",
      description: "فعال‌سازی انتخاب بازه تاریخی",
    },
    showTimePicker: {
      control: "boolean",
      description: "نمایش انتخابگر ساعت برای تاریخ انتخاب‌شده",
    },
    initialDate: {
      control: "text",
      description: "تاریخ اولیه به‌صورت ISO (UTC)",
    },
    initialEndDate: {
      control: "text",
      description: "تاریخ پایان اولیه برای حالت بازه (ISO UTC)",
    },
    onDateSelect: {
      control: false,
      description: "کالبک دریافت تاریخ(های) انتخاب‌شده",
    },
    onClose: {
      control: false,
      description: "کالبک بسته شدن مودال",
    },
    isOpen: {
      control: false,
      description: "وضعیت نمایش مودال (توسط داستان کنترل می‌شود)",
    },
  },
} satisfies Meta<typeof CalendarModal>;

export default meta;

type Story = StoryObj<typeof meta>;

const StoryLayout = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 p-6">
    <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200">
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
      <div className="mt-6">{children}</div>
    </div>
  </div>
);

const formatSelection = (start: string, end?: string) => {
  const formatter = new Intl.DateTimeFormat("fa-IR-u-nu-arab", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedStart = formatter.format(new Date(start));
  if (!end) {
    return formattedStart;
  }

  const formattedEnd = formatter.format(new Date(end));
  return `${formattedStart} تا ${formattedEnd}`;
};

export const Default: Story = {
  args: {
    isRangeMode: false,
    showTimePicker: false,
    isOpen: true,
    onClose: () => {},
    onDateSelect: () => {},
  },
  render: (args) => {
    const Example = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [selectedDate, setSelectedDate] = useState<string | null>(null);

      return (
        <StoryLayout
          title="مودال تقویم - حالت تک تاریخ"
          description="انتخاب یک تاریخ آینده به همراه نمایش نتیجه در کارت زیر.">
          <div className="flex flex-col gap-4">
            <button
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
              type="button"
              onClick={() => setIsOpen(true)}>
              انتخاب تاریخ
            </button>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              {selectedDate ? (
                <span>تاریخ انتخاب شده: {selectedDate}</span>
              ) : (
                <span>هنوز تاریخی انتخاب نشده است.</span>
              )}
            </div>
          </div>

          <CalendarModal
            {...args}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onDateSelect={(start) => {
              setSelectedDate(formatSelection(start));
            }}
          />
        </StoryLayout>
      );
    };

    return <Example />;
  },
};

export const RangeSelection: Story = {
  args: {
    isRangeMode: true,
    showTimePicker: false,
    isOpen: true,
    onClose: () => {},
    onDateSelect: () => {},
  },
  render: (args) => {
    const Example = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [range, setRange] = useState<string | null>(null);

      const defaults = useMemo(() => {
        const now = new Date();
        const start = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
        const end = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
        return {
          initialDate: start.toISOString(),
          initialEndDate: end.toISOString(),
        };
      }, []);

      return (
        <StoryLayout
          title="مودال تقویم - انتخاب بازه تاریخی"
          description="با فعال بودن حالت بازه، می‌توانید تاریخ شروع و پایان را مشخص کنید.">
          <div className="flex flex-col gap-4">
            <button
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
              type="button"
              onClick={() => setIsOpen(true)}>
              انتخاب بازه جدید
            </button>

            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-700">
              {range ? (
                <span>بازه انتخاب شده: {range}</span>
              ) : (
                <span>ابتدا یک بازه تاریخی انتخاب کنید.</span>
              )}
            </div>
          </div>

          <CalendarModal
            {...args}
            {...defaults}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onDateSelect={(start, end) => {
              setRange(formatSelection(start, end));
            }}
          />
        </StoryLayout>
      );
    };

    return <Example />;
  },
};

export const WithTimePicker: Story = {
  args: {
    isRangeMode: false,
    showTimePicker: true,
    isOpen: true,
    onClose: () => {},
    onDateSelect: () => {},
  },
  render: (args) => {
    const Example = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [selection, setSelection] = useState<string | null>(null);

      return (
        <StoryLayout
          title="مودال تقویم - با انتخاب ساعت"
          description="نمایش انتخابگر ساعت برای تعیین دقیق‌تر زمان شروع و پایان.">
          <div className="flex flex-col gap-4">
            <button
              className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-purple-700"
              type="button"
              onClick={() => setIsOpen(true)}>
              تعیین تاریخ و ساعت
            </button>

            <div className="rounded-xl border border-purple-100 bg-purple-50 p-4 text-sm text-purple-700">
              {selection ? (
                <span>زمان‌بندی انتخاب شده: {selection}</span>
              ) : (
                <span>تاریخ و ساعت موردنظر خود را انتخاب کنید.</span>
              )}
            </div>
          </div>

          <CalendarModal
            {...args}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onDateSelect={(start, end) => {
              setSelection(formatSelection(start, end));
            }}
          />
        </StoryLayout>
      );
    };

    return <Example />;
  },
};
