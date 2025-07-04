// src/app/layout.tsx
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getUserLocale } from "@/actions/locale";
import { defaultLocale, locales } from "@/i18n/config";
import "@/app/globals.css";

export const metadata = {
  title: "Dashboard | Build with Next.js",
  description: "A dashboard build with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getUserLocale();

  // Nếu locale không hợp lệ
  if (!locales.includes(locale as "en" | "vi")) {
    notFound();
  }

  const messages = (await import(`@/translations/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
