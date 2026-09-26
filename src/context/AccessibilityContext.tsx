"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AccessibilityContextType {
  fontSizeLevel: number; // 0 = normal, 1 = grande, 2 = extra grande
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  speakText: (text: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1); // Padrão já inicia ampliado
  const [highContrast, setHighContrast] = useState<boolean>(false);

  const increaseFontSize = () => setFontSizeLevel((prev) => Math.min(prev + 1, 2));
  const decreaseFontSize = () => setFontSizeLevel((prev) => Math.max(prev - 1, 0));
  const toggleHighContrast = () => setHighContrast((prev) => !prev);

  // Leitor de tela nativo do navegador para acessibilidade assistiva
  const speakText = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "pt-BR";
      utterance.rate = 0.9; // Leitura um pouco mais pausada para melhor compreensão
      window.speechSynthesis.speak(utterance);
    }
  };

  const getFontClass = () => {
    switch (fontSizeLevel) {
      case 0:
        return "text-base";
      case 2:
        return "text-2xl leading-relaxed";
      case 1:
      default:
        return "text-xl leading-relaxed";
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        fontSizeLevel,
        increaseFontSize,
        decreaseFontSize,
        highContrast,
        toggleHighContrast,
        speakText,
      }}
    >
      <div
        className={`min-h-screen transition-colors duration-200 ${getFontClass()} ${
          highContrast
            ? "bg-black text-yellow-300 [&_*]:border-yellow-300"
            : "bg-slate-50 text-slate-900"
        }`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility deve ser usado dentro de um AccessibilityProvider");
  }
  return context;
}