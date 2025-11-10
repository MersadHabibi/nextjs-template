"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function NavLink({
  href,
  className,
  children,
  startsWith,
  activeFor,
  onClick,
  title,
  checkSearchParams,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  startsWith?: boolean;
  activeFor?: string[];
  title?: string;
  onClick?: () => void;
  checkSearchParams?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const baseHref = href.split("?")[0];

  const isActive =
    (startsWith ? pathname.startsWith(baseHref) : pathname === baseHref) ||
    activeFor?.some((item) => pathname.startsWith(item)) ||
    (checkSearchParams &&
      checkSearchParamsMatch(baseHref, pathname, searchParams));

  return (
    <Link
      title={title}
      href={href}
      className={cn(isActive && "active", className)}
      onClick={onClick}>
      {children}
    </Link>
  );
}

function checkSearchParamsMatch(
  href: string,
  pathname: string,
  searchParams: URLSearchParams,
): boolean {
  try {
    const hrefUrl = new URL(href, window.location.origin);
    const currentUrl = new URL(
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ""),
      window.location.origin,
    );

    // Check if pathnames match
    if (hrefUrl.pathname !== currentUrl.pathname) {
      return false;
    }

    // Check if search parameters match
    const hrefParams = hrefUrl.searchParams;
    const currentParams = currentUrl.searchParams;

    // Check if all href parameters exist in current URL with same values
    for (const [key, value] of hrefParams.entries()) {
      if (currentParams.get(key) !== value) {
        return false;
      }
    }

    return true;
  } catch {
    // If URL parsing fails, fall back to simple string comparison
    return false;
  }
}
