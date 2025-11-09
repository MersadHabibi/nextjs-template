import { cn } from "@/lib/utils";
import Link from "next/link";
import Spinner from "../loaders/Spinner";
import Loader from "../loaders/Loader";

export default function Button({
  children,
  className = "rounded-md text-white font-medium cursor-pointer hover:brightness-90 transition-all inline-flex items-center justify-center gap-x-1.5",
  onClick,
  disabled,
  type,
  href,
  isLoading,
  size = "md",
  variant,
  buttonType = "solid",
  loaderType = "spinner",
  isSquare = false,
  isRounded = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
  href?: string;
  isLoading?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "blue" | "red" | "green";
  buttonType?: "solid" | "outline" | "ghost" | "glass";
  loaderType?: "spinner" | "dots";
  isSquare?: boolean;
  isRounded?: boolean;
}) {
  const disabledClassName =
    "disabled:opacity-70 cursor-auto disabled:hover:brightness-100 dark:disabled:opacity-60";
  const square = "aspect-square! px-0!";
  const rounded = "rounded-full";
  const solid = "bg-primary";
  const solidBlue = "bg-primary-blue";
  const solidRed = "bg-primary-red";
  const solidGreen = "bg-primary-green";
  const outline = "border border-primary-border text-primary-text";
  const outlineBlue =
    "border-primary-blue/50 text-primary-blue hover:border-primary-blue/70 hover:text-primary-blue border";
  const outlineRed =
    "border-primary-red/50 text-primary-red hover:border-primary-red/70 hover:text-primary-red border";
  const outlineGreen =
    "border-primary-green/50 text-primary-green hover:border-primary-green/70 hover:text-primary-green border";
  const ghost = "bg-transparent text-primary-text hover:bg-primary-text/10";
  const ghostBlue = "bg-transparent text-primary-blue hover:bg-primary-blue/10";
  const ghostRed = "bg-transparent text-primary-red hover:bg-primary-red/10";
  const ghostGreen =
    "bg-transparent text-primary-green hover:bg-primary-green/10";
  const glass =
    "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/50";
  const glassBlue =
    "bg-primary-blue/10 text-primary-blue! hover:bg-primary-blue/20 border border-primary-blue/50";
  const glassRed =
    "bg-primary-red/10 text-primary-red! hover:bg-primary-red/20 border border-primary-red/50";
  const glassGreen =
    "bg-primary-green/10 text-primary-green! hover:bg-primary-green/20 border border-primary-green/50";

  const isLoadingClassName = "opacity-80 cursor-loader";
  const loader =
    loaderType === "spinner" ? (
      <Spinner className="absolute inset-0 m-auto" />
    ) : (
      <Loader className="absolute inset-0 m-auto" />
    );
  const buttonVariant =
    buttonType === "solid"
      ? variant === "blue"
        ? solidBlue
        : variant === "red"
          ? solidRed
          : variant === "green"
            ? solidGreen
            : solid
      : buttonType === "outline"
        ? variant === "blue"
          ? outlineBlue
          : variant === "red"
            ? outlineRed
            : variant === "green"
              ? outlineGreen
              : outline
        : buttonType === "ghost"
          ? variant === "blue"
            ? ghostBlue
            : variant === "red"
              ? ghostRed
              : variant === "green"
                ? ghostGreen
                : ghost
          : variant === "blue"
            ? glassBlue
            : variant === "red"
              ? glassRed
              : variant === "green"
                ? glassGreen
                : glass;
  const buttonSize =
    size === "sm"
      ? "h-10 px-6 text-sm"
      : size === "md"
        ? "h-12 px-7 text-base"
        : "h-14 px-8 px-10 text-lg";

  if (href)
    return (
      <Link
        href={href}
        className={cn(
          className,
          buttonVariant,
          buttonSize,
          isSquare && square,
          isRounded && rounded,
          disabled && disabledClassName,
          isLoading && isLoadingClassName,
        )}>
        {children}
      </Link>
    );

  return (
    <button
      className={cn(
        className,
        buttonSize,
        buttonVariant,
        isSquare && square,
        isRounded && rounded,
        disabled && disabledClassName,
        isLoading && isLoadingClassName,
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}>
      {isLoading && loader}
      <div
        className={cn(
          "flex items-center justify-center gap-x-1.5",
          isLoading && "invisible",
        )}>
        {children}
      </div>
    </button>
  );
}
