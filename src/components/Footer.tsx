"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-zinc-600 dark:text-zinc-400 text-sm">
        <p>{t("footerText")}</p>
      </div>
    </footer>
  );
}
