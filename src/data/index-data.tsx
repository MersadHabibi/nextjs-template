import { Code2, Layers, Package, Settings, Sparkles, Zap } from "lucide-react";

export const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Next.js 16 + React 19.2",
    description: "آخرین نسخه Next.js با React Compiler و Server Components",
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "TypeScript Pre-configured",
    description: "تنظیمات کامل TypeScript با Path Aliases (@/*)",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "TanStack Query (React Query)",
    description: "مدیریت State Server-side و Caching هوشمند",
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Axios Instance",
    description: "Axios کانفیگ شده با Interceptors و Error Handling",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Tailwind CSS v4",
    description: "آخرین نسخه Tailwind با React Aria Components",
  },
  {
    icon: <Package className="h-6 w-6" />,
    title: "فونت ایران یکان",
    description: "فونت فارسی حرفه‌ای با تمام Weights",
  },
];

export const dependencies = [
  { name: "next", version: "16.0.1", type: "core" },
  { name: "react", version: "19.2.0", type: "core" },
  { name: "typescript", version: "^5", type: "core" },
  { name: "@tanstack/react-query", version: "^5.66.0", type: "state" },
  { name: "axios", version: "^1.9.0", type: "network" },
  { name: "react-hook-form", version: "^7.54.2", type: "forms" },
  { name: "zod", version: "^3.24.1", type: "forms" },
  { name: "zustand", version: "^5.0.3", type: "state" },
  { name: "tailwindcss", version: "^4", type: "styling" },
  { name: "framer-motion", version: "^12.4.3", type: "animation" },
  { name: "next-themes", version: "^0.4.6", type: "ui" },
  { name: "react-aria-components", version: "^1.6.0", type: "ui" },
  { name: "lucide-react", version: "^0.474.0", type: "icons" },
  { name: "jose", version: "^5.9.6", type: "security" },
  { name: "crypto-js", version: "^4.2.0", type: "security" },
  { name: "js-cookie", version: "^3.0.5", type: "utils" },
  { name: "moment-jalaali", version: "^0.10.4", type: "date" },
  { name: "react-multi-date-picker", version: "^4.5.2", type: "date" },
  { name: "react-hot-toast", version: "^2.5.1", type: "ui" },
  { name: "react-dropzone", version: "^14.3.5", type: "ui" },
  { name: "swiper", version: "^11.2.10", type: "ui" },
  { name: "embla-carousel-react", version: "^8.5.2", type: "ui" },
  { name: "react-quill", version: "^2.0.0", type: "editor" },
  { name: "react-color", version: "^2.19.3", type: "ui" },
  { name: "react-circular-progressbar", version: "^2.2.0", type: "ui" },
  { name: "eslint", version: "^9", type: "dev" },
  { name: "prettier", version: "^3.4.2", type: "dev" },
];
