// src/i18n/LanguageContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "./i18n"; // ajuste o caminho se necessário

type LanguageContextType = {
  language: "pt" | "es";
  setLanguage: (lang: "pt" | "es") => void;
  t: (key: string, opts?: any) => string;
  loading: boolean;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "pt",
  setLanguage: () => {},
  t: (k) => i18n.t(k),
  loading: true,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<"pt" | "es">((i18n.locale.slice(0,2) === "es" ? "es" : "pt") as "pt" | "es");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega idioma salvo (se houver)
    const load = async () => {
      try {
        const stored = await AsyncStorage.getItem("@app_language");
        if (stored === "pt" || stored === "es") {
          i18n.locale = stored;
          setLanguageState(stored);
        } else {
          // mantém o locale inicial do i18n
          setLanguageState(i18n.locale.slice(0,2) === "es" ? "es" : "pt");
        }
      } catch (e) {
        console.warn("Erro ao carregar idioma:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const setLanguage = async (lang: "pt" | "es") => {
    try {
      i18n.locale = lang;
      await AsyncStorage.setItem("@app_language", lang);
      setLanguageState(lang);
    } catch (e) {
      console.warn("Erro ao salvar idioma:", e);
    }
  };

  const t = (key: string, opts?: any) => i18n.t(key, opts);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, loading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
