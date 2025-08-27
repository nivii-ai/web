import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ locale: string }>;
// }): Promise<Metadata> {
//   const { locale } = await params;

//   // Set the locale for next-intl
//   setRequestLocale(locale);

//   const messages = await getMessages();
//   const metadata = messages.Metadata as {
//     title: string;
//     description: string;
//     keywords: string;
//   };

//   return {
//     title: metadata.title,
//     description: metadata.description,
//     keywords: metadata.keywords,
//     openGraph: {
//       title: metadata.title,
//       description: metadata.description,
//       locale: locale,
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: metadata.title,
//       description: metadata.description,
//     },
//     alternates: {
//       languages: {
//         es: "/es",
//         en: "/en",
//       },
//     },
//   };
// }

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${nunito.variable} antialiased scroll-smooth`}>
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
