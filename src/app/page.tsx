"use client";

import { dependencies, features } from "@/data/index-data";
import ThemeToggle from "@/components/modules/ThemeToggle";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

const typeColors: Record<string, string> = {
  core: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  state:
    "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  network:
    "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
  forms:
    "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  styling: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  animation:
    "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
  ui: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20",
  icons:
    "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  security: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
  utils: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
  date: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  editor:
    "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  dev: "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 animate-pulse rounded-full bg-linear-to-r from-blue-500 to-purple-500 opacity-30 blur-2xl" />
                <div className="relative rounded-full bg-linear-to-br from-blue-500 to-purple-600 p-6 shadow-2xl">
                  <Code2 className="h-16 w-16 text-white" />
                </div>
              </div>
            </motion.div>

            <h1 className="mb-6 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text pt-2.5 text-5xl font-black tracking-tight text-transparent sm:text-7xl">
              Next.js Starter Template
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-gray-600 dark:text-gray-300">
              تمپلیت حرفه‌ای و آماده برای شروع سریع پروژه‌های Next.js
              <br />
              همه چیز کانفیگ شده و آماده استفاده
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/yourusername/nextjs15-reactquery"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-linear-to-r from-blue-600 to-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl">
                مشاهده در GitHub
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    "git clone https://github.com/yourusername/nextjs15-reactquery.git",
                  );
                }}
                className="rounded-full border border-gray-200 bg-white px-8 py-3 text-sm font-semibold text-gray-900 shadow-lg transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                کپی دستور Clone
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            ویژگی‌های کانفیگ شده
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            همه چیز آماده است، فقط کد بنویس!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-all hover:translate-y-[-5px] hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex rounded-xl bg-linear-to-br from-blue-500 to-purple-600 p-3 text-white shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Packages Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            پکیج‌های نصب شده
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {dependencies.length} پکیج آماده و کانفیگ شده
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-3xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {dependencies.map((dep, index) => (
              <motion.div
                key={dep.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.02 * index }}
                className={`rounded-xl border p-4 ${typeColors[dep.type]} cursor-default transition-all hover:scale-105`}>
                <div className="flex flex-col gap-1">
                  <span className="truncate text-sm font-semibold">
                    {dep.name}
                  </span>
                  <span className="text-xs opacity-70">{dep.version}</span>
                  <span className="mt-1 text-xs font-medium capitalize">
                    {dep.type}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-24 border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            ساخته شده با ❤️ برای توسعه‌دهندگان
          </p>
        </div>
      </div>
    </div>
  );
}
