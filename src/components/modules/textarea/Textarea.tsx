"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type TextareaError = { message: string };

type TextareaProps = {
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  containerClassName?: string;
  error?: TextareaError;
  children?: React.ReactNode;
  label?: string;
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  textareaType?: "outline" | "filled";
  autoResize?: boolean;
};

export default function Textarea({
  textareaProps,
  containerClassName,
  error,
  children,
  label,
  labelProps,
  required,
  size = "md",
  textareaType = "outline",
  autoResize = false,
}: TextareaProps) {
  const textareaName = textareaProps?.name;
  const textareaId = textareaProps?.id ?? textareaName;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const defaultClassName =
    "w-full rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-400 dark:placeholder:text-gray-500";

  const sizeClassName: Record<NonNullable<TextareaProps["size"]>, string> = {
    sm: "text-sm px-3 py-2",
    md: "text-base px-4 py-3",
    lg: "text-lg px-4 py-4",
  };

  const adjustHeight = () => {
    const element = textareaRef.current;

    if (!autoResize || !element) return;

    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [autoResize, textareaProps?.value, textareaProps?.defaultValue]);

  const {
    className,
    onChange,
    ["aria-describedby"]: ariaDescribedByFromProps,
    ...restTextareaProps
  } = textareaProps ?? {};

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (autoResize) {
      adjustHeight();
    }

    if (onChange) {
      onChange(event);
    }
  };

  const errorMessageId = error
    ? `${textareaId ?? "textarea"}-error-message`
    : undefined;
  const ariaDescribedBy = error
    ? [errorMessageId, ariaDescribedByFromProps].filter(Boolean).join(" ")
    : ariaDescribedByFromProps;

  const { className: labelClassName, ...restLabelProps } = labelProps ?? {};

  return (
    <div className={cn("w-full", containerClassName)}>
      {label && (
        <label
          htmlFor={textareaId}
          className={cn("mb-1.5 block text-sm font-medium", labelClassName)}
          {...restLabelProps}>
          <span className="text-gray-600 dark:text-gray-300">{label}</span>
          {required && <span className="text-red! mr-1">*</span>}
        </label>
      )}

      <div className="relative w-full">
        <textarea
          {...restTextareaProps}
          ref={textareaRef}
          onChange={handleChange}
          className={cn(
            defaultClassName,
            sizeClassName[size],
            textareaType === "filled" &&
              "border-none bg-gray-100 dark:bg-gray-700",
            autoResize ? "resize-none overflow-y-hidden" : "resize-y",
            className,
            error && "border-red! placeholder:text-red",
          )}
          rows={
            autoResize
              ? undefined
              : (restTextareaProps.rows ??
                (size === "sm" ? 3 : size === "md" ? 4 : 5))
          }
          aria-invalid={error ? "true" : undefined}
          aria-describedby={ariaDescribedBy || undefined}
        />
      </div>

      {children}

      {error ? (
        <p id={errorMessageId} className="text-red text-start text-xs">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
