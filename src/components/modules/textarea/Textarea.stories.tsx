import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Textarea from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    textareaProps: {
      description: "HTML textarea attributes (optional - has default styling)",
    },
    containerClassName: {
      control: "text",
      description: "Container wrapper className",
    },
    error: {
      description: "Error object with message",
    },
    children: {
      description: "Additional content rendered below the textarea",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    textareaProps: {
      placeholder: "پیامی بنویسید...",
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: "پیام شما",
    required: true,
    textareaProps: {
      placeholder: "پیام خود را در اینجا بنویسید",
    },
  },
};

export const WithError: Story = {
  args: {
    label: "توضیحات",
    textareaProps: {
      placeholder: "حداقل ۲۰ کاراکتر",
    },
    error: {
      message: "توضیحات باید حداقل ۲۰ کاراکتر باشد",
    },
  },
};

export const WithHelperText: Story = {
  args: {
    label: "یادداشت",
    textareaProps: {
      placeholder: "نکات مهم پروژه را بنویسید",
    },
    children: (
      <p className="mt-1 text-xs text-gray-500">
        می‌توانید تا ۵۰۰ کاراکتر وارد کنید.
      </p>
    ),
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-[420px] flex-col gap-6">
      <div>
        <p className="mb-2 text-xs text-gray-500">کوچک (sm)</p>
        <Textarea
          size="sm"
          textareaProps={{
            placeholder: "یادداشت کوتاه",
          }}
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">متوسط (md - پیش‌فرض)</p>
        <Textarea
          size="md"
          textareaProps={{
            placeholder: "توضیحات بیشتر",
          }}
        />
      </div>
      <div>
        <p className="mb-2 text-base font-semibold text-gray-700">بزرگ (lg)</p>
        <Textarea
          size="lg"
          textareaProps={{
            placeholder: "شرح کامل تجربه کاربری",
          }}
        />
      </div>
    </div>
  ),
};

export const AutoResize: Story = {
  render: () => {
    const AutoResizeExample = () => {
      const [value, setValue] = useState(
        "سلام! این textarea به صورت خودکار متناسب با محتوای شما بزرگ می‌شود.",
      );

      return (
        <Textarea
          label="متن چند خطی"
          autoResize
          textareaProps={{
            value,
            onChange: (event) => setValue(event.target.value),
            placeholder: "بنویسید و تغییر سایز خودکار را مشاهده کنید...",
          }}
        >
          <p className="mt-1 text-xs text-gray-500">
            طول متن فعلی: {value.length.toLocaleString()} کاراکتر
          </p>
        </Textarea>
      );
    };

    return <AutoResizeExample />;
  },
};

export const Controlled: Story = {
  render: () => {
    const ControlledExample = () => {
      const [notes, setNotes] = useState("");

      return (
        <div className="flex w-[420px] flex-col gap-4">
          <Textarea
            label="یادداشت‌ها"
            textareaProps={{
              value: notes,
              onChange: (event) => setNotes(event.target.value),
              placeholder: "یادداشت‌های خود را ثبت کنید",
            }}
          />
          <div className="rounded-lg bg-gray-100 p-3 text-xs dark:bg-gray-800">
            <p className="font-medium text-gray-700 dark:text-gray-200">یادداشت ذخیره شده:</p>
            <p className="mt-1 text-gray-600 dark:text-gray-300">
              {notes || "هنوز چیزی نوشته نشده است."}
            </p>
          </div>
        </div>
      );
    };

    return <ControlledExample />;
  },
};

export const FilledVariant: Story = {
  args: {
    textareaType: "filled",
    label: "تجربه شما",
    textareaProps: {
      placeholder: "از تجربه خود در استفاده از محصول برای ما بگویید",
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "یادداشت (غیرفعال)",
    textareaProps: {
      placeholder: "این فیلد غیرفعال است",
      disabled: true,
    },
  },
};

export const WithCharacterLimit: Story = {
  render: () => {
    const CharacterLimitExample = () => {
      const [comment, setComment] = useState("");
      const limit = 200;

      return (
        <Textarea
          label="بازخورد"
          textareaProps={{
            value: comment,
            onChange: (event) => {
              if (event.target.value.length <= limit) {
                setComment(event.target.value);
              }
            },
            placeholder: "نظر خود را در مورد محصول بنویسید...",
          }}
        >
          <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
            <span>حداکثر {limit.toLocaleString()} کاراکتر</span>
            <span>
              {comment.length}/{limit}
            </span>
          </div>
        </Textarea>
      );
    };

    return <CharacterLimitExample />;
  },
};

