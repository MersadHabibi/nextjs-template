import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Button content",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    variant: {
      control: "select",
      options: [undefined, "blue", "red", "green"],
      description: "Button color variant",
    },
    buttonType: {
      control: "select",
      options: ["solid", "outline", "ghost", "glass"],
      description: "Button style type",
    },
    loaderType: {
      control: "select",
      options: ["spinner", "dots"],
      description: "Loading indicator type",
    },
    isLoading: {
      control: "boolean",
      description: "Loading state",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    isSquare: {
      control: "boolean",
      description: "Square aspect ratio",
    },
    isRounded: {
      control: "boolean",
      description: "Fully rounded corners",
    },
    type: {
      control: "select",
      options: ["button", "submit", "reset"],
      description: "HTML button type",
    },
    href: {
      control: "text",
      description: "Link URL (renders as Link component)",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Button
export const Default: Story = {
  args: {
    children: "دکمه پیش‌فرض",
  },
};

// Size Variants
export const Small: Story = {
  args: {
    children: "دکمه کوچک",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    children: "دکمه متوسط",
    size: "md",
  },
};

export const Large: Story = {
  args: {
    children: "دکمه بزرگ",
    size: "lg",
  },
};

// Solid Variants
export const SolidDefault: Story = {
  args: {
    children: "دکمه پیش‌فرض",
    buttonType: "solid",
  },
};

export const SolidBlue: Story = {
  args: {
    children: "دکمه آبی",
    buttonType: "solid",
    variant: "blue",
  },
};

export const SolidRed: Story = {
  args: {
    children: "دکمه قرمز",
    buttonType: "solid",
    variant: "red",
  },
};

export const SolidGreen: Story = {
  args: {
    children: "دکمه سبز",
    buttonType: "solid",
    variant: "green",
  },
};

// Outline Variants
export const OutlineDefault: Story = {
  args: {
    children: "دکمه پیش‌فرض",
    buttonType: "outline",
  },
};

export const OutlineBlue: Story = {
  args: {
    children: "دکمه آبی",
    buttonType: "outline",
    variant: "blue",
  },
};

export const OutlineRed: Story = {
  args: {
    children: "دکمه قرمز",
    buttonType: "outline",
    variant: "red",
  },
};

export const OutlineGreen: Story = {
  args: {
    children: "دکمه سبز",
    buttonType: "outline",
    variant: "green",
  },
};

// Ghost Variants
export const GhostDefault: Story = {
  args: {
    children: "دکمه پیش‌فرض",
    buttonType: "ghost",
  },
};

export const GhostBlue: Story = {
  args: {
    children: "دکمه آبی",
    buttonType: "ghost",
    variant: "blue",
  },
};

export const GhostRed: Story = {
  args: {
    children: "دکمه قرمز",
    buttonType: "ghost",
    variant: "red",
  },
};

export const GhostGreen: Story = {
  args: {
    children: "دکمه سبز",
    buttonType: "ghost",
    variant: "green",
  },
};

// Glass Variants
export const GlassDefault: Story = {
  args: {
    children: "دکمه پیش‌فرض",
    buttonType: "glass",
  },
};

export const GlassBlue: Story = {
  args: {
    children: "دکمه آبی",
    buttonType: "glass",
    variant: "blue",
  },
};

export const GlassRed: Story = {
  args: {
    children: "دکمه قرمز",
    buttonType: "glass",
    variant: "red",
  },
};

export const GlassGreen: Story = {
  args: {
    children: "دکمه سبز",
    buttonType: "glass",
    variant: "green",
  },
};

// Loading States
export const LoadingWithSpinner: Story = {
  args: {
    children: "در حال بارگذاری",
    isLoading: true,
    loaderType: "spinner",
  },
};

export const LoadingWithDots: Story = {
  args: {
    children: "در حال بارگذاری",
    isLoading: true,
    loaderType: "dots",
  },
};

export const LoadingBlue: Story = {
  args: {
    children: "در حال ذخیره",
    isLoading: true,
    variant: "blue",
    buttonType: "solid",
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    children: "دکمه غیرفعال",
    disabled: true,
  },
};

// Square Buttons
export const SquareSmall: Story = {
  args: {
    children: "✓",
    isSquare: true,
    size: "sm",
  },
};

export const SquareMedium: Story = {
  args: {
    children: "✓",
    isSquare: true,
    size: "md",
  },
};

export const SquareLarge: Story = {
  args: {
    children: "✓",
    isSquare: true,
    size: "lg",
  },
};

// Rounded Buttons
export const Rounded: Story = {
  args: {
    children: "دکمه گرد",
    isRounded: true,
  },
};

export const RoundedSquare: Story = {
  args: {
    children: "✓",
    isRounded: true,
    isSquare: true,
  },
};

// Link Button
export const AsLink: Story = {
  args: {
    children: "لینک دکمه",
    href: "#",
  },
};

export const AsLinkBlue: Story = {
  args: {
    children: "لینک آبی",
    href: "#",
    variant: "blue",
    buttonType: "outline",
  },
};

// All Sizes Comparison
export const AllSizes: Story = {
  args: { children: "" },
  render: () => (
    <div className="flex flex-col gap-4">
      <Button size="sm">دکمه کوچک</Button>
      <Button size="md">دکمه متوسط</Button>
      <Button size="lg">دکمه بزرگ</Button>
    </div>
  ),
};

// All Button Types Comparison
export const AllButtonTypes: Story = {
  args: { children: "" },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button buttonType="solid" variant="blue">
          Solid
        </Button>
        <Button buttonType="outline" variant="blue">
          Outline
        </Button>
        <Button buttonType="ghost" variant="blue">
          Ghost
        </Button>
        <Button buttonType="glass" variant="blue">
          Glass
        </Button>
      </div>
    </div>
  ),
};

// All Color Variants
export const AllColorVariants: Story = {
  args: { children: "" },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button buttonType="ghost">پیش‌فرض</Button>
        <Button buttonType="ghost" variant="blue">
          آبی
        </Button>
        <Button buttonType="ghost" variant="red">
          قرمز
        </Button>
        <Button buttonType="ghost" variant="green">
          سبز
        </Button>
      </div>

      <div className="flex gap-4">
        <Button>پیش‌فرض</Button>
        <Button variant="blue">آبی</Button>
        <Button variant="red">قرمز</Button>
        <Button variant="green">سبز</Button>
      </div>
      <div className="flex gap-4">
        <Button buttonType="outline">پیش‌فرض</Button>
        <Button buttonType="outline" variant="blue">
          آبی
        </Button>
        <Button buttonType="outline" variant="red">
          قرمز
        </Button>
        <Button buttonType="outline" variant="green">
          سبز
        </Button>
      </div>

      <div className="flex gap-4">
        <Button buttonType="glass">پیش‌فرض</Button>
        <Button buttonType="glass" variant="blue">
          آبی
        </Button>
        <Button buttonType="glass" variant="red">
          قرمز
        </Button>
        <Button buttonType="glass" variant="green">
          سبز
        </Button>
      </div>
    </div>
  ),
};

// Interactive Example
export const Interactive: Story = {
  args: {
    children: "دکمه تعاملی",
    onClick: () => alert("دکمه کلیک شد!"),
  },
};

// With Icon
export const WithIcon: Story = {
  args: { children: "" },
  render: () => (
    <div className="flex flex-col gap-4">
      <Button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
        <span>با آیکون</span>
      </Button>
      <Button variant="blue" buttonType="outline">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span>پروفایل</span>
      </Button>
    </div>
  ),
};
