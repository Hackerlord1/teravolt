"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

export default function I18nProvider({ children }) {
  useEffect(() => {
    const saved = localStorage.getItem("lang");

    if (saved && i18n.language !== saved) {
      i18n.changeLanguage(saved);
    }
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
