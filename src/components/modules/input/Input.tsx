"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { EyeIcon, EyeOffIcon } from "lucide-react";

// Function to convert Persian numbers to English
const convertPersianToEnglish = (str: string) => {
  if (!str) return "";

  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return str.replace(/[۰-۹]/g, (match) => {
    return persianDigits.indexOf(match).toString();
  });
};

// Function to format number with commas
const formatNumberWithCommas = (value: string) => {
  if (!value) return "";
  // Remove all non-digits
  const numericValue = value.replace(/[^\d]/g, "");
  // Add commas
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Function to remove commas from formatted number
const removeCommas = (value: string) => {
  return value.replace(/,/g, "");
};

export default function Input({
  inputProps,
  containerClassName,
  error,
  children,
  label,
  labelProps,
  required,
  size = "md",
  inputType = "outline",
  isCurrency = false,
}: {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  containerClassName?: string;
  error?: { message: string };
  children?: React.ReactNode;
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  inputType?: "outline" | "filled";
  isCurrency?: boolean;
}) {
  const inputName = inputProps?.name;
  const [displayValue, setDisplayValue] = useState("");

  const defaultClassName =
    "w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClassName = {
    sm: "text-sm px-2 py-1.5",
    md: "text-base px-4 py-2",
    lg: "text-lg px-6 py-3",
  };

  const [showPassword, setShowPassword] = useState(false);

  const isNumberType = inputProps?.type === "number";
  const isPasswordType = inputProps?.type === "password";

  // Initialize and sync displayValue for currency mode
  useEffect(() => {
    if (isCurrency) {
      const initialValue = inputProps?.value ?? inputProps?.defaultValue ?? "";
      if (initialValue !== undefined && initialValue !== "") {
        const stringValue = String(initialValue);
        const numericValue = removeCommas(stringValue).replace(/[^0-9]/g, "");
        const formattedValue = formatNumberWithCommas(numericValue);
        setDisplayValue(formattedValue);
      }
    }
  }, [isCurrency, inputProps?.value, inputProps?.defaultValue]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Convert Persian digits to English and remove non-digits
    const convertedValue = convertPersianToEnglish(value).replace(
      /[^0-9]/g,
      "",
    );
    // Update the input value
    e.target.value = convertedValue;

    // Call the original onChange if provided
    if (inputProps?.onChange) {
      inputProps?.onChange(e);
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Convert Persian digits to English and remove commas
    let numericValue = convertPersianToEnglish(value);
    numericValue = removeCommas(numericValue).replace(/[^0-9]/g, "");

    // Format with commas for display
    const formattedValue = formatNumberWithCommas(numericValue);
    setDisplayValue(formattedValue);

    // Send the numeric value without commas to onChange
    e.target.value = numericValue;

    // Call the original onChange if provided
    if (inputProps?.onChange) {
      inputProps?.onChange(e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  let modifiedInputProps = { ...inputProps };

  if (isCurrency) {
    // Currency mode: format with commas for display
    modifiedInputProps = {
      ...modifiedInputProps,
      type: "text" as const,
      value: displayValue,
      onChange: handleCurrencyChange,
    };
  } else if (isNumberType) {
    modifiedInputProps = {
      ...modifiedInputProps,
      type: "text" as const,
      onChange: handleNumberChange,
    };
  } else if (isPasswordType) {
    modifiedInputProps = {
      ...modifiedInputProps,
      type: showPassword ? "text" : "password",
    };
  }

  return (
    <div className={cn("w-full", containerClassName)}>
      {label && (
        <label
          htmlFor={inputName}
          className={cn(
            "mb-1.5 block text-sm font-medium",
            labelProps?.className,
          )}>
          <span className="text-gray-500 dark:text-gray-400">{label}</span>
          {required && <span className="text-red! mr-1">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <input
          {...modifiedInputProps}
          className={cn(
            defaultClassName,
            sizeClassName[size],
            inputType === "filled" &&
              "border-none bg-gray-100 dark:bg-gray-700",
            isPasswordType && "pl-10",
            inputProps?.className,
            error && "border-red! placeholder:text-red",
          )}
        />
        {isPasswordType && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className={cn(
              "absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200",
              error && "text-red!",
            )}>
            {showPassword ? (
              <EyeOffIcon className="h-5 w-5" />
            ) : (
              <EyeIcon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {children}
      {error ? (
        <p className="text-red pt-1 text-start text-xs">{error?.message}</p>
      ) : null}
    </div>
  );
}
