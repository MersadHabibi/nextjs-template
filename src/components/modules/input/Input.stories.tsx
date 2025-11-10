import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inputProps: {
      description: "HTML input attributes (optional - has default styling)",
    },
    containerClassName: {
      control: "text",
      description: "Container wrapper className",
    },
    error: {
      description: "Error object with message",
    },
    children: {
      description: "Additional content below input",
    },
  },
  decorators: [
    (Story) => (
      <div className="min-w-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Input
export const Default: Story = {
  args: {
    inputProps: {
      placeholder: "نام خود را وارد کنید",
    },
  },
};

// Text Input
export const TextInput: Story = {
  args: {
    inputProps: {
      type: "text",
      placeholder: "متن",
    },
  },
};

// Email Input
export const EmailInput: Story = {
  args: {
    inputProps: {
      type: "email",
      placeholder: "ایمیل خود را وارد کنید",
      dir: "ltr",
    },
  },
};

// Password Input with Toggle
export const PasswordInput: Story = {
  args: {
    inputProps: {
      type: "password",
      placeholder: "رمز عبور",
    },
  },
};

// Number Input (Persian digits supported)
export const NumberInput: Story = {
  args: {
    inputProps: {
      type: "number",
      placeholder: "شماره تلفن (اعداد فارسی مجاز)",
    },
  },
};

// Input with Error
export const WithError: Story = {
  args: {
    inputProps: {
      type: "email",
      placeholder: "ایمیل",
      dir: "ltr",
      className: "border-red-500 focus:border-red-600 text-left",
    },
    error: {
      message: "فرمت ایمیل صحیح نیست",
    },
  },
};

// Password with Error
export const PasswordWithError: Story = {
  args: {
    inputProps: {
      type: "password",
      placeholder: "رمز عبور",
      className: "border-red-500 focus:border-red-600",
    },
    error: {
      message: "رمز عبور باید حداقل ۸ کاراکتر باشد",
    },
  },
};

// Disabled Input
export const Disabled: Story = {
  args: {
    inputProps: {
      type: "text",
      placeholder: "غیرفعال",
      disabled: true,
    },
  },
};

// Input with Children
export const WithChildren: Story = {
  args: {
    inputProps: {
      type: "text",
      placeholder: "نام کاربری",
    },
    children: (
      <p className="mt-1 text-xs text-gray-500">
        نام کاربری شما باید حداقل 3 کاراکتر باشد
      </p>
    ),
  },
};

// Small Input
export const Small: Story = {
  args: {
    inputProps: {
      type: "text",
      placeholder: "اینپوت کوچک",
    },
    size: "sm",
  },
};

// Medium Input
export const Medium: Story = {
  args: {
    inputProps: {
      type: "text",
      placeholder: "اینپوت متوسط",
    },
    size: "md",
  },
};

// Large Input
export const Large: Story = {
  args: {
    inputProps: {
      type: "text",
      placeholder: "اینپوت بزرگ",
    },
    size: "lg",
  },
};

// Custom Styling Override
export const CustomStyling: Story = {
  args: {
    inputProps: {
      placeholder: "استایل سفارشی",
      className:
        "border-purple-500 bg-purple-50 dark:bg-purple-900/20 focus:border-purple-600",
    },
  },
};

// All Input Types Comparison
export const AllTypes: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-4">
      <div>
        <p className="mb-1 text-xs text-gray-500">Text Input</p>
        <Input
          inputProps={{
            type: "text",
            placeholder: "متن",
          }}
        />
      </div>
      <div>
        <p className="mb-1 text-xs text-gray-500">Email Input (LTR)</p>
        <Input
          inputProps={{
            type: "email",
            placeholder: "ایمیل",
            dir: "ltr",
            className: "text-left",
          }}
        />
      </div>
      <div>
        <p className="mb-1 text-xs text-gray-500">
          Password Input (با دکمه نمایش)
        </p>
        <Input
          inputProps={{
            type: "password",
            placeholder: "رمز عبور",
          }}
        />
      </div>
      <div>
        <p className="mb-1 text-xs text-gray-500">
          Number Input (پشتیبانی از اعداد فارسی)
        </p>
        <Input
          inputProps={{
            type: "number",
            placeholder: "شماره (اعداد فارسی مجاز)",
          }}
        />
      </div>
    </div>
  ),
};

// Form Example
export const FormExample: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-6">
      <div>
        <label className="mb-2 block text-sm font-medium">نام کاربری</label>
        <Input
          inputProps={{
            type: "text",
            placeholder: "username",
            dir: "ltr",
            className: "text-left",
          }}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">ایمیل</label>
        <Input
          inputProps={{
            type: "email",
            placeholder: "example@email.com",
            dir: "ltr",
            className: "text-left",
          }}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">رمز عبور</label>
        <Input
          inputProps={{
            type: "password",
            placeholder: "رمز عبور خود را وارد کنید",
          }}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">شماره تلفن</label>
        <Input
          inputProps={{
            type: "number",
            placeholder: "۰۹۱۲۳۴۵۶۷۸۹",
            dir: "ltr",
            className: "text-left",
          }}
        />
      </div>
    </div>
  ),
};

// With Validation Errors
export const ValidationErrors: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-6">
      <div>
        <label className="mb-2 block text-sm font-medium">نام کاربری</label>
        <Input
          inputProps={{
            type: "text",
            placeholder: "username",
            dir: "ltr",
            className: "border-red-500 focus:border-red-600",
          }}
          error={{ message: "نام کاربری باید حداقل 3 کاراکتر باشد" }}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">ایمیل</label>
        <Input
          inputProps={{
            type: "email",
            placeholder: "example@email.com",
            dir: "ltr",
            className: "border-red-500 focus:border-red-600 text-left",
          }}
          error={{ message: "فرمت ایمیل صحیح نیست" }}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">رمز عبور</label>
        <Input
          inputProps={{
            type: "password",
            placeholder: "رمز عبور",
            className: "border-red-500 focus:border-red-600",
          }}
          error={{
            message: "رمز عبور باید حداقل ۸ کاراکتر و شامل حروف و اعداد باشد",
          }}
        />
      </div>
    </div>
  ),
};

// Interactive Example with State
export const Interactive: Story = {
  render: () => {
    const InteractiveInput = () => {
      const [value, setValue] = useState("");
      const [showValue, setShowValue] = useState(false);

      return (
        <div className="flex w-[400px] flex-col gap-4">
          <Input
            inputProps={{
              type: "text",
              placeholder: "چیزی بنویسید...",
              value: value,
              onChange: (e) => setValue(e.target.value),
            }}
          />
          <button
            onClick={() => setShowValue(!showValue)}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            {showValue ? "مخفی کردن مقدار" : "نمایش مقدار"}
          </button>
          {showValue && value && (
            <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
              <p className="text-sm">
                <strong>مقدار وارد شده:</strong> {value}
              </p>
              <p className="text-sm">
                <strong>تعداد کاراکترها:</strong> {value.length}
              </p>
            </div>
          )}
        </div>
      );
    };

    return <InteractiveInput />;
  },
};

// Currency Input Demo
export const CurrencyInput: Story = {
  render: () => {
    const CurrencyExample = () => {
      const [price, setPrice] = useState("");

      return (
        <div className="flex w-[400px] flex-col gap-4">
          <Input
            inputProps={{
              placeholder: "قیمت را وارد کنید",
              value: price,
              onChange: (e) => setPrice(e.target.value),
              dir: "ltr",
              className: "text-left",
            }}
            isCurrency={true}
            label="قیمت محصول">
            <p className="mt-1 text-xs text-gray-500">
              💰 اعداد با کاما جدا می‌شوند (مثال: 1,000,000)
            </p>
          </Input>
          {price && (
            <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
              <p className="text-sm text-blue-900 dark:text-blue-100">
                <strong>مقدار نمایشی:</strong> {formatNumberWithCommas(price)}{" "}
                تومان
              </p>
              <p className="mt-2 text-sm text-blue-800 dark:text-blue-200">
                <strong>مقدار واقعی (بدون کاما):</strong> {price}
              </p>
              <p className="mt-2 text-xs text-blue-700 dark:text-blue-300">
                این مقدار به onChange ارسال می‌شود:{" "}
                <code className="rounded bg-blue-100 px-1 py-0.5 dark:bg-blue-800">
                  {price}
                </code>
              </p>
            </div>
          )}
        </div>
      );
    };

    // Helper function for display (same as in Input component)
    const formatNumberWithCommas = (value: string) => {
      if (!value) return "";
      const numericValue = value.replace(/[^\d]/g, "");
      return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return <CurrencyExample />;
  },
};

// Currency with Default Value
export const CurrencyWithDefaultValue: Story = {
  render: () => {
    const CurrencyDefaultExample = () => {
      const [price, setPrice] = useState("");

      return (
        <div className="flex w-[400px] flex-col gap-4">
          <div className="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
            <h4 className="font-bold text-amber-900 dark:text-amber-100">
              مقدار پیش‌فرض (defaultValue)
            </h4>
            <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
              مقدار پیش‌فرض 5,000,000 تومان نمایش داده می‌شود
            </p>
          </div>

          <Input
            inputProps={{
              defaultValue: "5000000",
              onChange: (e) => setPrice(e.target.value),
              placeholder: "قیمت",
              dir: "ltr",
              className: "text-left",
            }}
            isCurrency={true}
            label="قیمت با مقدار پیش‌فرض">
            <p className="mt-1 text-xs text-gray-500">
              مقدار پیش‌فرض: 5,000,000
            </p>
          </Input>

          {price && (
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <p className="text-sm text-green-900 dark:text-green-100">
                <strong>مقدار فعلی:</strong>{" "}
                {price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان
              </p>
              <p className="mt-2 text-xs text-green-700 dark:text-green-300">
                مقدار خام:{" "}
                <code className="rounded bg-green-100 px-1 py-0.5 dark:bg-green-800">
                  {price}
                </code>
              </p>
            </div>
          )}

          <div className="space-y-2">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                تفاوت value و defaultValue:
              </p>
              <ul className="mt-2 space-y-1 text-xs text-blue-700 dark:text-blue-300">
                <li>
                  <strong>defaultValue:</strong> فقط یک بار در ابتدا set می‌شود
                </li>
                <li>
                  <strong>value:</strong> controlled و همیشه به state متصل است
                </li>
              </ul>
            </div>
          </div>
        </div>
      );
    };

    return <CurrencyDefaultExample />;
  },
};

// Currency with Persian Numbers
export const CurrencyWithPersianNumbers: Story = {
  render: () => {
    const CurrencyPersianExample = () => {
      const [amount, setAmount] = useState("");

      return (
        <div className="flex w-[400px] flex-col gap-4">
          <div className="rounded-lg bg-purple-50 p-4 dark:bg-purple-900/20">
            <h4 className="font-bold text-purple-900 dark:text-purple-100">
              ورودی با اعداد فارسی و انگلیسی
            </h4>
            <p className="mt-1 text-sm text-purple-700 dark:text-purple-300">
              هم اعداد فارسی (۱۲۳) و هم انگلیسی (123) را امتحان کنید
            </p>
          </div>

          <Input
            inputProps={{
              placeholder: "مثال: ۱۲۳۴۵۶۷ یا 1234567",
              value: amount,
              onChange: (e) => setAmount(e.target.value),
              dir: "ltr",
              className: "text-left",
            }}
            isCurrency={true}
            label="مبلغ"
            required
          />

          {amount && (
            <div className="space-y-3">
              <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                <p className="text-xs font-medium text-green-900 dark:text-green-100">
                  ✓ نمایش با کاما
                </p>
                <p className="mt-1 text-lg font-bold text-green-700 dark:text-green-300">
                  {amount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ریال
                </p>
              </div>

              <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
                <p className="text-xs font-medium text-orange-900 dark:text-orange-100">
                  → مقدار ارسالی در onChange
                </p>
                <p className="mt-1 font-mono text-sm text-orange-700 dark:text-orange-300">
                  {amount}
                </p>
              </div>
            </div>
          )}
        </div>
      );
    };

    return <CurrencyPersianExample />;
  },
};

// Currency Controlled vs Uncontrolled
export const CurrencyControlledVsUncontrolled: Story = {
  render: () => {
    const ComparisonExample = () => {
      const [controlledValue, setControlledValue] = useState("1000000");

      return (
        <div className="flex w-[500px] flex-col gap-6">
          <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-900/20">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-100">
              مقایسه Controlled و Uncontrolled
            </h3>
            <p className="mt-1 text-sm text-indigo-700 dark:text-indigo-300">
              تفاوت بین استفاده از value و defaultValue
            </p>
          </div>

          <div className="space-y-6">
            {/* Controlled Input */}
            <div className="rounded-lg border-2 border-green-200 p-4 dark:border-green-800">
              <h4 className="mb-3 font-semibold text-green-900 dark:text-green-100">
                ✓ Controlled Input (با value)
              </h4>
              <Input
                inputProps={{
                  value: controlledValue,
                  onChange: (e) => setControlledValue(e.target.value),
                  placeholder: "قیمت",
                  dir: "ltr",
                  className: "text-left",
                }}
                isCurrency={true}
                label="قیمت Controlled"
              />
              <div className="mt-3 rounded bg-green-50 p-2 text-xs dark:bg-green-900/20">
                <p className="text-green-800 dark:text-green-200">
                  <strong>State:</strong> {controlledValue}
                </p>
                <button
                  onClick={() => setControlledValue("2500000")}
                  className="mt-2 rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700">
                  Set به 2,500,000
                </button>
              </div>
            </div>

            {/* Uncontrolled Input */}
            <div className="rounded-lg border-2 border-blue-200 p-4 dark:border-blue-800">
              <h4 className="mb-3 font-semibold text-blue-900 dark:text-blue-100">
                ⚡ Uncontrolled Input (با defaultValue)
              </h4>
              <Input
                inputProps={{
                  defaultValue: "3000000",
                  placeholder: "قیمت",
                  dir: "ltr",
                  className: "text-left",
                }}
                isCurrency={true}
                label="قیمت Uncontrolled"
              />
              <div className="mt-3 rounded bg-blue-50 p-2 text-xs dark:bg-blue-900/20">
                <p className="text-blue-800 dark:text-blue-200">
                  <strong>توضیح:</strong> مقدار اولیه 3,000,000 است و از state
                  استفاده نمی‌کند
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <h4 className="font-semibold">📚 نکات مهم:</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li className="flex gap-2">
                <span>•</span>
                <span>
                  <strong>Controlled:</strong> می‌توانید value را از بیرون تغییر
                  دهید
                </span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>
                  <strong>Uncontrolled:</strong> مناسب برای فرم‌های ساده و React
                  Hook Form
                </span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>
                  هر دو با{" "}
                  <code className="rounded bg-gray-200 px-1 dark:bg-gray-700">
                    isCurrency
                  </code>{" "}
                  کار می‌کنند
                </span>
              </li>
            </ul>
          </div>
        </div>
      );
    };

    return <ComparisonExample />;
  },
};

// Currency Form with React Hook Form
export const CurrencyFormExample: Story = {
  render: () => {
    const productSchema = z.object({
      productName: z.string().min(3, "نام محصول باید حداقل ۳ کاراکتر باشد"),
      price: z
        .string()
        .min(1, "قیمت الزامی است")
        .refine((val) => {
          const num = parseInt(val);
          return !isNaN(num) && num > 0;
        }, "قیمت باید عددی بزرگتر از صفر باشد"),
      discount: z.string().optional(),
    });

    type ProductFormData = z.infer<typeof productSchema>;

    const CurrencyForm = () => {
      const [submitted, setSubmitted] = useState<ProductFormData | null>(null);

      const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
      } = useForm<ProductFormData>({
        resolver: zodResolver(productSchema),
        mode: "onChange",
        defaultValues: {
          productName: "محصول 1",
          price: "100000",
          discount: "10000",
        },
      });

      const price = watch("price");
      const discount = watch("discount");

      const calculateFinalPrice = () => {
        if (!price) return 0;
        const priceNum = parseInt(price) || 0;
        const discountNum = parseInt(discount || "0") || 0;
        return priceNum - discountNum;
      };

      const onSubmit = (data: ProductFormData) => {
        setSubmitted(data);
        console.log("Product data:", data);
      };

      return (
        <div className="flex w-[500px] flex-col gap-6">
          <div className="rounded-lg bg-linear-to-r from-blue-50 to-purple-50 p-4 dark:from-blue-900/20 dark:to-purple-900/20">
            <h3 className="font-bold text-gray-900 dark:text-gray-100">
              فرم محصول با قیمت‌گذاری
            </h3>
            <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
              استفاده از isCurrency در فرم‌های واقعی
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4">
            <div>
              <Input
                inputProps={{
                  ...register("productName"),
                  type: "text",
                  placeholder: "نام محصول",
                  className: errors.productName ? "border-red-500" : "",
                }}
                label="نام محصول"
                required
                error={
                  errors.productName
                    ? { message: errors.productName.message || "" }
                    : undefined
                }
              />
            </div>

            <div>
              <Input
                inputProps={{
                  ...register("price"),
                  placeholder: "قیمت محصول",
                  dir: "ltr",
                  className: `text-left ${errors.price ? "border-red-500" : ""}`,
                }}
                isCurrency={true}
                label="قیمت (تومان)"
                required
                error={
                  errors.price
                    ? { message: errors.price.message || "" }
                    : undefined
                }>
                <p className="mt-1 text-xs text-gray-500">
                  قیمت به صورت خودکار با کاما نمایش داده می‌شود
                </p>
              </Input>
            </div>

            <div>
              <Input
                inputProps={{
                  ...register("discount"),
                  placeholder: "تخفیف (اختیاری)",
                  dir: "ltr",
                  className: "text-left",
                }}
                isCurrency={true}
                label="تخفیف (تومان)"
              />
            </div>

            {price && (
              <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">
                      قیمت اصلی:
                    </span>
                    <span className="font-medium">
                      {price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان
                    </span>
                  </div>
                  {discount && (
                    <div className="flex justify-between text-red-600 dark:text-red-400">
                      <span>تخفیف:</span>
                      <span className="font-medium">
                        - {discount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} تومان
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2 text-base font-bold dark:border-gray-700">
                    <span>قیمت نهایی:</span>
                    <span className="text-green-600 dark:text-green-400">
                      {calculateFinalPrice().toLocaleString()} تومان
                    </span>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="rounded-lg bg-blue-500 py-2.5 font-medium text-white transition-colors hover:bg-blue-600">
              ثبت محصول
            </button>
          </form>

          {submitted && (
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <h4 className="font-bold text-green-900 dark:text-green-100">
                ✓ محصول ثبت شد
              </h4>
              <div className="mt-3 space-y-2 text-sm text-green-800 dark:text-green-200">
                <p>
                  <strong>نام:</strong> {submitted.productName}
                </p>
                <p>
                  <strong>قیمت (عدد خام):</strong> {submitted.price}
                </p>
                {submitted.discount && (
                  <p>
                    <strong>تخفیف (عدد خام):</strong> {submitted.discount}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      );
    };

    return <CurrencyForm />;
  },
};

// Persian Number Input Demo
export const PersianNumberDemo: Story = {
  render: () => {
    const PersianNumberInput = () => {
      const [value, setValue] = useState("123");

      return (
        <div className="flex w-[400px] flex-col gap-4">
          <Input
            inputProps={{
              type: "number",
              placeholder: "اعداد فارسی یا انگلیسی تایپ کنید: ۱۲۳ یا 123",
              value: value,
              onChange: (e) => setValue(e.target.value),
              dir: "ltr",
              className: "text-left",
              defaultValue: "123",
            }}>
            <p className="mt-1 text-xs text-gray-500">
              💡 اعداد فارسی به صورت خودکار به انگلیسی تبدیل می‌شوند و فقط اعداد
              مجاز هستند
            </p>
          </Input>
          {value && (
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <p className="text-sm text-green-700 dark:text-green-300">
                <strong>مقدار تبدیل شده:</strong> {value}
              </p>
              <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                طول: {value.length} کاراکتر
              </p>
            </div>
          )}
        </div>
      );
    };

    return <PersianNumberInput />;
  },
};

// Password Visibility Demo
export const PasswordVisibilityDemo: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-4">
      <div>
        <label className="mb-2 block text-sm font-medium">
          رمز عبور (روی آیکون چشم کلیک کنید)
        </label>
        <Input
          inputProps={{
            type: "password",
            placeholder: "رمز عبور خود را وارد کنید",
            defaultValue: "MySecretPassword123",
          }}>
          <p className="mt-1 text-xs text-gray-500">
            روی آیکون چشم کلیک کنید تا رمز عبور نمایش داده شود
          </p>
        </Input>
      </div>
    </div>
  ),
};

// Different Sizes
export const DifferentSizes: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-4">
      <div>
        <label className="mb-1 block text-xs font-medium">کوچک (Small)</label>
        <Input
          inputProps={{
            type: "text",
            placeholder: "اینپوت کوچک",
          }}
          size="sm"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">
          متوسط (Medium - Default)
        </label>
        <Input
          inputProps={{
            type: "text",
            placeholder: "اینپوت متوسط",
          }}
          size="md"
        />
      </div>
      <div>
        <label className="mb-2 block text-base font-medium">بزرگ (Large)</label>
        <Input
          inputProps={{
            type: "text",
            placeholder: "اینپوت بزرگ",
            className: "px-5 py-3 text-lg",
          }}
          size="lg"
        />
      </div>
      <div>
        <label className="mb-2 block text-lg font-medium">
          خیلی بزرگ (Extra Large)
        </label>
        <Input
          inputProps={{
            type: "text",
            placeholder: "اینپوت خیلی بزرگ",
            className: "px-6 py-4 text-xl",
          }}
        />
      </div>
    </div>
  ),
};

// Real-time Validation Example
export const RealTimeValidation: Story = {
  render: () => {
    const ValidationExample = () => {
      const [email, setEmail] = useState("");
      const [error, setError] = useState<{ message: string } | undefined>();

      const validateEmail = (value: string) => {
        if (!value) {
          setError(undefined);
          return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setError({ message: "فرمت ایمیل معتبر نیست" });
        } else {
          setError(undefined);
        }
      };

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
      };

      return (
        <div className="flex w-[400px] flex-col gap-4">
          <Input
            inputProps={{
              type: "email",
              placeholder: "ایمیل خود را وارد کنید",
              value: email,
              onChange: handleChange,
              dir: "ltr",
              className: `text-left ${error ? "border-red-500 focus:border-red-600" : email ? "border-green-500 focus:border-green-600" : ""}`,
            }}
            error={error}
          />
          {email && !error && (
            <div className="rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
              <p className="text-sm text-green-700 dark:text-green-300">
                ✓ ایمیل معتبر است
              </p>
            </div>
          )}
        </div>
      );
    };

    return <ValidationExample />;
  },
};

// Password Strength Indicator
export const PasswordStrength: Story = {
  render: () => {
    const PasswordStrengthExample = () => {
      const [password, setPassword] = useState("");

      const getPasswordStrength = (pwd: string) => {
        if (!pwd) return { strength: 0, label: "", color: "" };

        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[^a-zA-Z0-9]/.test(pwd)) strength++;

        const labels = ["", "ضعیف", "متوسط", "خوب", "عالی"];
        const colors = ["", "red", "orange", "yellow", "green"];

        return { strength, label: labels[strength], color: colors[strength] };
      };

      const strengthInfo = getPasswordStrength(password);

      return (
        <div className="flex w-[400px] flex-col gap-4">
          <Input
            inputProps={{
              type: "password",
              placeholder: "رمز عبور",
              value: password,
              onChange: (e) => setPassword(e.target.value),
            }}>
            {password && (
              <div className="mt-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded ${
                        level <= strengthInfo.strength
                          ? `bg-${strengthInfo.color}-500`
                          : "bg-gray-200 dark:bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  قدرت رمز عبور: <strong>{strengthInfo.label}</strong>
                </p>
              </div>
            )}
          </Input>
          <div className="rounded-lg bg-blue-50 p-3 text-xs dark:bg-blue-900/20">
            <p className="font-medium text-blue-900 dark:text-blue-100">
              نکات برای رمز عبور قوی:
            </p>
            <ul className="mt-1 list-inside list-disc text-blue-700 dark:text-blue-300">
              <li>حداقل ۸ کاراکتر</li>
              <li>شامل حروف بزرگ و کوچک</li>
              <li>شامل اعداد</li>
              <li>شامل کاراکترهای خاص</li>
            </ul>
          </div>
        </div>
      );
    };

    return <PasswordStrengthExample />;
  },
};

// React Hook Form with Zod Validation
export const ReactHookFormWithZod: Story = {
  render: () => {
    const formSchema = z.object({
      username: z
        .string()
        .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
        .max(20, "نام کاربری نباید بیشتر از ۲۰ کاراکتر باشد"),
      email: z
        .string()
        .email("فرمت ایمیل صحیح نیست")
        .min(1, "ایمیل الزامی است"),
      phone: z
        .string()
        .min(11, "شماره تلفن باید ۱۱ رقم باشد")
        .max(11, "شماره تلفن باید ۱۱ رقم باشد")
        .regex(/^[0-9]+$/, "فقط اعداد مجاز است"),
      password: z
        .string()
        .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
          "رمز عبور باید شامل حروف بزرگ، کوچک و عدد باشد",
        ),
      age: z
        .string()
        .min(1, "سن الزامی است")
        .refine((val) => {
          const num = parseInt(val);
          return num >= 18 && num <= 100;
        }, "سن باید بین ۱۸ تا ۱۰۰ سال باشد"),
    });

    type FormData = z.infer<typeof formSchema>;

    const FormWithValidation = () => {
      const [submittedData, setSubmittedData] = useState<FormData | null>(null);

      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        reset,
      } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
      });

      const onSubmit = async (data: FormData) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSubmittedData(data);
        console.log("Form submitted:", data);
      };

      return (
        <div className="flex w-[500px] flex-col gap-6">
          <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
            <h3 className="font-bold text-blue-900 dark:text-blue-100">
              فرم با React Hook Form و Zod
            </h3>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              اعتبارسنجی خودکار و نمایش خطاها
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4">
            {/* Username */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                نام کاربری <span className="text-red-500">*</span>
              </label>
              <Input
                inputProps={{
                  ...register("username"),
                  type: "text",
                  placeholder: "username",
                  dir: "ltr",
                  className: `text-left ${errors.username ? "border-red-500 focus:border-red-600" : ""}`,
                }}
                error={
                  errors.username
                    ? { message: errors.username.message || "" }
                    : undefined
                }
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                ایمیل <span className="text-red-500">*</span>
              </label>
              <Input
                inputProps={{
                  ...register("email"),
                  type: "email",
                  placeholder: "example@email.com",
                  dir: "ltr",
                  className: `text-left ${errors.email ? "border-red-500 focus:border-red-600" : ""}`,
                }}
                error={
                  errors.email
                    ? { message: errors.email.message || "" }
                    : undefined
                }
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                شماره تلفن <span className="text-red-500">*</span>
              </label>
              <Input
                inputProps={{
                  ...register("phone"),
                  type: "number",
                  placeholder: "۰۹۱۲۳۴۵۶۷۸۹",
                  dir: "ltr",
                  className: `text-left ${errors.phone ? "border-red-500 focus:border-red-600" : ""}`,
                }}
                error={
                  errors.phone
                    ? { message: errors.phone.message || "" }
                    : undefined
                }>
                <p className="mt-1 text-xs text-gray-500">
                  اعداد فارسی هم قابل استفاده هستند
                </p>
              </Input>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                رمز عبور <span className="text-red-500">*</span>
              </label>
              <Input
                inputProps={{
                  ...register("password"),
                  type: "password",
                  placeholder: "رمز عبور خود را وارد کنید",
                  className: errors.password
                    ? "border-red-500 focus:border-red-600"
                    : "",
                }}
                error={
                  errors.password
                    ? { message: errors.password.message || "" }
                    : undefined
                }
              />
            </div>

            {/* Age */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                سن <span className="text-red-500">*</span>
              </label>
              <Input
                inputProps={{
                  ...register("age"),
                  type: "number",
                  placeholder: "سن شما",
                  dir: "ltr",
                  className: `text-left ${errors.age ? "border-red-500 focus:border-red-600" : ""}`,
                }}
                error={
                  errors.age ? { message: errors.age.message || "" } : undefined
                }
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-blue-500 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
                {isSubmitting ? "در حال ارسال..." : "ثبت فرم"}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setSubmittedData(null);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2.5 font-medium transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800">
                پاک کردن
              </button>
            </div>

            {/* Form Status */}
            <div className="text-sm">
              <span
                className={`font-medium ${isValid ? "text-green-600" : "text-orange-600"}`}>
                وضعیت فرم:{" "}
                {isValid ? "✓ معتبر" : "✗ نامعتبر (فیلدها را تکمیل کنید)"}
              </span>
            </div>
          </form>

          {/* Submitted Data Display */}
          {submittedData && (
            <div className="rounded-lg bg-green-50 p-4 dark:bg-green-900/20">
              <h4 className="font-bold text-green-900 dark:text-green-100">
                ✓ فرم با موفقیت ارسال شد
              </h4>
              <div className="mt-3 space-y-2 text-sm text-green-800 dark:text-green-200">
                <p>
                  <strong>نام کاربری:</strong> {submittedData.username}
                </p>
                <p>
                  <strong>ایمیل:</strong> {submittedData.email}
                </p>
                <p>
                  <strong>شماره تلفن:</strong> {submittedData.phone}
                </p>
                <p>
                  <strong>رمز عبور:</strong>{" "}
                  {"*".repeat(submittedData.password.length)}
                </p>
                <p>
                  <strong>سن:</strong> {submittedData.age}
                </p>
              </div>
            </div>
          )}
        </div>
      );
    };

    return <FormWithValidation />;
  },
};

// Simple Login Form Example
export const LoginFormExample: Story = {
  render: () => {
    const loginSchema = z.object({
      email: z
        .string()
        .email("فرمت ایمیل صحیح نیست")
        .min(1, "ایمیل الزامی است"),
      password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
    });

    type LoginFormData = z.infer<typeof loginSchema>;

    const LoginForm = () => {
      const [loginSuccess, setLoginSuccess] = useState(false);

      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onBlur",
      });

      const onSubmit = async (data: LoginFormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setLoginSuccess(true);
        console.log("Login:", data);
      };

      if (loginSuccess) {
        return (
          <div className="flex w-[400px] flex-col items-center gap-4 rounded-lg bg-green-50 p-8 dark:bg-green-900/20">
            <div className="text-4xl">✓</div>
            <h3 className="text-xl font-bold text-green-900 dark:text-green-100">
              ورود موفق!
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              به حساب کاربری خود خوش آمدید
            </p>
            <button
              onClick={() => setLoginSuccess(false)}
              className="mt-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
              بازگشت به فرم
            </button>
          </div>
        );
      }

      return (
        <div className="w-[400px] rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold">ورود به حساب کاربری</h2>
            <p className="mt-1 text-sm text-gray-500">
              لطفا اطلاعات خود را وارد کنید
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">ایمیل</label>
              <Input
                inputProps={{
                  ...register("email"),
                  type: "email",
                  placeholder: "example@email.com",
                  dir: "ltr",
                  className: `text-left ${errors.email ? "border-red-500" : ""}`,
                }}
                error={
                  errors.email
                    ? { message: errors.email.message || "" }
                    : undefined
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">رمز عبور</label>
              <Input
                inputProps={{
                  ...register("password"),
                  type: "password",
                  placeholder: "رمز عبور",
                  className: errors.password ? "border-red-500" : "",
                }}
                error={
                  errors.password
                    ? { message: errors.password.message || "" }
                    : undefined
                }
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>مرا به خاطر بسپار</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                فراموشی رمز عبور؟
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-500 py-2.5 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
              {isSubmitting ? "در حال ورود..." : "ورود"}
            </button>

            <p className="text-center text-sm text-gray-500">
              حساب کاربری ندارید؟{" "}
              <a href="#" className="text-blue-600 hover:underline">
                ثبت نام
              </a>
            </p>
          </form>
        </div>
      );
    };

    return <LoginForm />;
  },
};

// Registration Form Example
export const RegistrationFormExample: Story = {
  render: () => {
    const registrationSchema = z
      .object({
        fullName: z
          .string()
          .min(3, "نام و نام خانوادگی باید حداقل ۳ کاراکتر باشد"),
        username: z
          .string()
          .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
          .regex(/^[a-zA-Z0-9_]+$/, "فقط حروف انگلیسی، اعداد و _ مجاز است"),
        email: z.string().email("فرمت ایمیل صحیح نیست"),
        phone: z
          .string()
          .length(11, "شماره تلفن باید ۱۱ رقم باشد")
          .regex(/^09[0-9]{9}$/, "شماره تلفن باید با ۰۹ شروع شود"),
        password: z
          .string()
          .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
          .regex(/[A-Z]/, "رمز عبور باید شامل حداقل یک حرف بزرگ باشد")
          .regex(/[a-z]/, "رمز عبور باید شامل حداقل یک حرف کوچک باشد")
          .regex(/[0-9]/, "رمز عبور باید شامل حداقل یک عدد باشد"),
        confirmPassword: z.string().min(1, "تکرار رمز عبور الزامی است"),
      })
      .refine((data) => data.password === data.confirmPassword, {
        message: "رمز عبور و تکرار آن یکسان نیستند",
        path: ["confirmPassword"],
      });

    type RegistrationFormData = z.infer<typeof registrationSchema>;

    const RegistrationForm = () => {
      const [registered, setRegistered] = useState(false);

      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<RegistrationFormData>({
        resolver: zodResolver(registrationSchema),
        mode: "onChange",
      });

      const onSubmit = async (data: RegistrationFormData) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setRegistered(true);
        console.log("Registration:", data);
      };

      if (registered) {
        return (
          <div className="flex w-[500px] flex-col items-center gap-4 rounded-lg bg-green-50 p-8 dark:bg-green-900/20">
            <div className="text-5xl">🎉</div>
            <h3 className="text-2xl font-bold text-green-900 dark:text-green-100">
              ثبت نام با موفقیت انجام شد!
            </h3>
            <p className="text-center text-sm text-green-700 dark:text-green-300">
              حساب کاربری شما ایجاد شد. لطفا ایمیل خود را برای فعالسازی حساب
              بررسی کنید.
            </p>
            <button
              onClick={() => setRegistered(false)}
              className="mt-2 rounded-lg bg-green-600 px-6 py-2 font-medium text-white hover:bg-green-700">
              بازگشت
            </button>
          </div>
        );
      }

      return (
        <div className="w-[500px] rounded-xl border border-gray-200 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold">ثبت نام</h2>
            <p className="mt-1 text-sm text-gray-500">
              برای ایجاد حساب کاربری فرم را تکمیل کنید
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                نام و نام خانوادگی
              </label>
              <Input
                inputProps={{
                  ...register("fullName"),
                  type: "text",
                  placeholder: "علی احمدی",
                  className: errors.fullName ? "border-red-500" : "",
                }}
                error={
                  errors.fullName
                    ? { message: errors.fullName.message || "" }
                    : undefined
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                نام کاربری
              </label>
              <Input
                inputProps={{
                  ...register("username"),
                  type: "text",
                  placeholder: "username",
                  dir: "ltr",
                  className: `text-left ${errors.username ? "border-red-500" : ""}`,
                }}
                error={
                  errors.username
                    ? { message: errors.username.message || "" }
                    : undefined
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">ایمیل</label>
                <Input
                  inputProps={{
                    ...register("email"),
                    type: "email",
                    placeholder: "email@example.com",
                    dir: "ltr",
                    className: `text-left ${errors.email ? "border-red-500" : ""}`,
                  }}
                  error={
                    errors.email
                      ? { message: errors.email.message || "" }
                      : undefined
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  شماره تلفن
                </label>
                <Input
                  inputProps={{
                    ...register("phone"),
                    type: "number",
                    placeholder: "۰۹۱۲۳۴۵۶۷۸۹",
                    dir: "ltr",
                    className: `text-left ${errors.phone ? "border-red-500" : ""}`,
                  }}
                  error={
                    errors.phone
                      ? { message: errors.phone.message || "" }
                      : undefined
                  }
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">رمز عبور</label>
              <Input
                inputProps={{
                  ...register("password"),
                  type: "password",
                  placeholder: "رمز عبور",
                  className: errors.password ? "border-red-500" : "",
                }}
                error={
                  errors.password
                    ? { message: errors.password.message || "" }
                    : undefined
                }
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                تکرار رمز عبور
              </label>
              <Input
                inputProps={{
                  ...register("confirmPassword"),
                  type: "password",
                  placeholder: "تکرار رمز عبور",
                  className: errors.confirmPassword ? "border-red-500" : "",
                }}
                error={
                  errors.confirmPassword
                    ? { message: errors.confirmPassword.message || "" }
                    : undefined
                }
              />
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1 rounded" required />
              <span className="text-gray-600 dark:text-gray-400">
                قوانین و مقررات را مطالعه کرده و{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  می‌پذیرم
                </a>
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-500 py-2.5 font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
              {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
            </button>

            <p className="text-center text-sm text-gray-500">
              قبلا ثبت نام کرده‌اید؟{" "}
              <a href="#" className="text-blue-600 hover:underline">
                ورود
              </a>
            </p>
          </form>
        </div>
      );
    };

    return <RegistrationForm />;
  },
};
