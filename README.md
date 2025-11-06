# 🚀 Next.js 15 + React Query Template

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

تمپلیت حرفه‌ای و آماده برای شروع سریع پروژه‌های Next.js با تمام کانفیگ‌های لازم

[مشاهده دمو](#) • [گزارش باگ](../../issues) • [درخواست ویژگی](../../issues)

</div>

---

## ✨ ویژگی‌های کلیدی

### 🎯 Framework & Core

- ⚡ **Next.js 16** - آخرین نسخه با React 19.2
- 🔷 **TypeScript** - با تنظیمات کامل و Path Aliases
- 🎨 **Tailwind CSS v4** - جدیدترین نسخه
- 🌙 **Next Themes** - پشتیبانی از Dark Mode

### 📦 State Management & Data Fetching

- 🔄 **TanStack Query (React Query)** - مدیریت حرفه‌ای State Server-side
- 🐻 **Zustand** - State Management سبک و قدرتمند
- 🌐 **Axios** - با Interceptors و Error Handling کامل

### 📝 Forms & Validation

- 📋 **React Hook Form** - مدیریت فرم‌های پیچیده
- ✅ **Zod** - اعتبارسنجی قدرتمند داده‌ها

### 🎭 UI & Animations

- ✨ **Framer Motion** - انیمیشن‌های حرفه‌ای
- 🎨 **React Aria Components** - کامپوننت‌های Accessible
- 🖼️ **Lucide React** - آیکون‌های زیبا و سبک
- 🎪 **Swiper & Embla Carousel** - اسلایدرهای حرفه‌ای

### 📅 Date & Time

- 📆 **Moment Jalaali** - پشتیبانی کامل از تاریخ شمسی
- 🗓️ **React Multi Date Picker** - انتخابگر تاریخ حرفه‌ای

### 🛠️ Developer Experience

- 🔍 **ESLint** - با تنظیمات Next.js و React Query
- 💅 **Prettier** - فرمت‌دهی خودکار کد
- 🐋 **Docker** - آماده برای Deploy

### 🔒 Security & Utils

- 🔐 **Jose** - JWT و رمزنگاری
- 🍪 **JS Cookie** - مدیریت Cookie

---

## 🚀 شروع سریع

### نصب

```bash
# Clone کردن پروژه
git clone https://github.com/yourusername/nextjs15-reactquery.git

# ورود به پوشه پروژه
cd nextjs15-reactquery

# نصب وابستگی‌ها
pnpm install
# یا
npm install
# یا
yarn install
```

### اجرای پروژه

```bash
# حالت Development
pnpm dev

# Build برای Production
pnpm build

# اجرای Build شده
pnpm start

# Lint و بررسی کد
pnpm lint
```

پروژه روی [http://localhost:3000](http://localhost:3000) اجرا می‌شود.

---

## 📁 ساختار پروژه

```
nextjs15-reactquery/
├── src/
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── layout.tsx          # Layout اصلی
│   │   ├── page.tsx            # صفحه اصلی
│   │   └── globals.css         # استایل‌های Global
│   ├── components/             # کامپوننت‌های React
│   │   ├── Icons.tsx
│   │   └── modules/            # کامپوننت‌های ماژولار
│   │       ├── buttons/
│   │       ├── inputs/
│   │       └── ...
│   ├── services/               # سرویس‌های API
│   │   ├── axios-client.ts     # تنظیمات Axios
│   │   ├── api-config.ts       # کانفیگ API
│   │   ├── queries/            # React Query Queries
│   │   └── mutations/          # React Query Mutations
│   ├── hooks/                  # Custom Hooks
│   ├── lib/                    # توابع کمکی
│   ├── types/                  # TypeScript Types
│   ├── permissions/            # مدیریت دسترسی‌ها
│   └── providers/              # React Providers
├── public/                     # فایل‌های Static
│   ├── fonts/                  # فونت ایران یکان
│   ├── images/
│   └── svg/
├── tailwind.config.ts          # تنظیمات Tailwind
├── tsconfig.json               # تنظیمات TypeScript
└── package.json
```

---

## 🎨 تنظیمات Tailwind CSS

این پروژه از **Tailwind CSS v4** با افزونه‌های زیر استفاده می‌کند:

- `tailwindcss-react-aria-components` - استایل‌دهی به React Aria
- `tailwindcss-animate` - انیمیشن‌های آماده
- `tailwind-merge` - ادغام کلاس‌ها

### 🎨 سیستم رنگ‌بندی سفارشی

پروژه دارای یک سیستم رنگ‌بندی حرفه‌ای با پشتیبانی کامل از **Dark Mode** است.

> **نکته:** صفحه اصلی از رنگ‌های پیش‌فرض Tailwind با `dark:` prefix استفاده می‌کند، اما تمام Variable های رنگی برای استفاده در پروژه شما آماده و کانفیگ شده‌اند.

#### رنگ‌های آماده (Variable ها):

```tsx
// پس‌زمینه‌ها
bg - background; // پس‌زمینه اصلی
bg - surface; // پس‌زمینه کارت‌ها

// رنگ‌های برند
bg - primary; // آبی (اصلی)
bg - secondary; // بنفش
bg - accent; // صورتی

// متن
text - text - primary; // متن اصلی
text - text - secondary; // متن فرعی
text - text - tertiary; // متن کم‌رنگ

// خطوط
border - border; // خطوط و حاشیه‌ها
```

#### مثال استفاده:

```tsx
<button className="bg-primary text-text-inverse px-4 py-2 rounded-lg">
  دکمه اصلی
</button>

<div className="bg-surface border border-border rounded-xl p-6">
  <h3 className="text-text-primary">عنوان</h3>
  <p className="text-text-secondary">توضیحات</p>
</div>
```

**💡 مزیت اصلی:** همه رنگ‌ها به صورت خودکار در Dark Mode تغییر می‌کنند!

```tsx
// قبل - باید برای هر رنگ dark: بنویسید
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">

// بعد - یک کلاس برای هر دو حالت
<div className="bg-surface text-text-primary">
```

📖 **راهنمای کامل:** [COLOR_USAGE_EXAMPLES.md](./src/styles/COLOR_USAGE_EXAMPLES.md)

---

## 🔧 تنظیمات Axios

Axios با ویژگی‌های زیر کانفیگ شده:

- ✅ Interceptors برای Request/Response
- ✅ مدیریت خودکار Error
- ✅ پشتیبانی از Authentication Token
- ✅ Retry برای درخواست‌های ناموفق

مسیر: `src/services/axios-client.ts`

---

## 🔄 React Query Setup

TanStack Query با تنظیمات بهینه:

- ✅ Devtools فعال در حالت Development
- ✅ Caching هوشمند
- ✅ Automatic Refetching
- ✅ Optimistic Updates

مثال استفاده:

```typescript
// Query
const { data, isLoading } = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers,
});

// Mutation
const mutation = useMutation({
  mutationFn: createUser,
  onSuccess: () => {
    queryClient.invalidateQueries(["users"]);
  },
});
```

---

## 🌙 Dark Mode

Dark Mode با استفاده از `next-themes` پیاده‌سازی شده:

```tsx
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      تغییر تم
    </button>
  );
}
```

---

## 📝 فرم‌ها و Validation

مثال استفاده از React Hook Form + Zod:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('ایمیل معتبر نیست'),
  password: z.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

---

## 🚢 Deploy

### Vercel (توصیه می‌شود)

```bash
# نصب Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build Image
docker build -t nextjs-app .

# اجرای Container
docker run -p 3000:3000 nextjs-app
```

---

## 📦 لیست کامل پکیج‌ها

### Dependencies (27 پکیج)

| پکیج                     | نسخه     | دسته‌بندی        |
| ------------------------ | -------- | ---------------- |
| next                     | 16.0.1   | Core             |
| react                    | 19.2.0   | Core             |
| @tanstack/react-query    | ^5.66.0  | State Management |
| axios                    | ^1.9.0   | Network          |
| zustand                  | ^5.0.3   | State Management |
| react-hook-form          | ^7.54.2  | Forms            |
| zod                      | ^3.24.1  | Validation       |
| framer-motion            | ^12.4.3  | Animation        |
| tailwindcss              | ^4       | Styling          |
| next-themes              | ^0.4.6   | UI               |
| lucide-react             | ^0.474.0 | Icons            |
| react-aria-components    | ^1.6.0   | UI Components    |
| moment-jalaali           | ^0.10.4  | Date (Persian)   |
| react-multi-date-picker  | ^4.5.2   | Date Picker      |
| jose                     | ^5.9.6   | Security (JWT)   |
| crypto-js                | ^4.2.0   | Security         |
| js-cookie                | ^3.0.5   | Utils            |
| react-hot-toast          | ^2.5.1   | Notifications    |
| react-dropzone           | ^14.3.5  | File Upload      |
| swiper                   | ^11.2.10 | Carousel         |
| embla-carousel-react     | ^8.5.2   | Carousel         |
| react-quill              | ^2.0.0   | Rich Text Editor |
| react-color              | ^2.19.3  | Color Picker     |
| class-variance-authority | ^0.7.1   | Utils            |
| clsx                     | ^2.1.1   | Utils            |
| tailwind-merge           | ^3.0.1   | Utils            |
| usehooks-ts              | ^3.1.0   | Hooks            |

### Dev Dependencies (12 پکیج)

- TypeScript, ESLint, Prettier
- Tailwind CSS Plugins
- Type Definitions

---

## 🤝 مشارکت

مشارکت شما همیشه خوشایند است! لطفاً:

1. پروژه را Fork کنید
2. برنچ جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات را Commit کنید (`git commit -m 'Add amazing feature'`)
4. به برنچ خود Push کنید (`git push origin feature/amazing-feature`)
5. Pull Request باز کنید

---

## 📝 لایسنس

این پروژه تحت لایسنس MIT منتشر شده است.

---

## 💬 پشتیبانی

اگر سوالی دارید یا به کمک نیاز دارید:

- 🐛 [گزارش باگ](../../issues)
- 💡 [درخواست ویژگی جدید](../../issues)
- 📧 ایمیل: your.email@example.com

---

<div align="center">

**ساخته شده با ❤️ برای توسعه‌دهندگان ایرانی**

⭐ اگر این پروژه به درد شما خورد، یک ستاره بدهید!

</div>
