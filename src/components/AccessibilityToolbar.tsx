"use client";

import { useAccessibility } from "@/context/AccessibilityContext";
import { ZoomIn, ZoomOut, Contrast, Volume2 } from "lucide-react";

export function AccessibilityToolbar() {
  const {
    increaseFontSize,
    decreaseFontSize,
    highContrast,
    toggleHighContrast,
    speakText,
  } = useAccessibility();

  return (
    <header className="bg-blue-900 text-white p-3 shadow-md border-b-4 border-yellow-400">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <span className="font-extrabold text-xl tracking-wide flex items-center gap-2">
          👵 Conecta Idade 👴
        </span>

        <div className="flex flex-wrap items-center gap-2" role="region" aria-label="Ferramentas de Acessibilidade">
          <button
            onClick={() => {
              decreaseFontSize();
              speakText("Texto diminuído");
            }}
            className="flex items-center gap-1 bg-white text-blue-950 font-bold px-4 py-2 rounded-xl text-lg hover:bg-yellow-200 transition focus:ring-4 focus:ring-yellow-400"
            aria-label="Diminuir tamanho da letra"
          >
            <ZoomOut className="w-6 h-6" /> A-
          </button>

          <button
            onClick={() => {
              increaseFontSize();
              speakText("Texto aumentado");
            }}
            className="flex items-center gap-1 bg-white text-blue-950 font-bold px-4 py-2 rounded-xl text-lg hover:bg-yellow-200 transition focus:ring-4 focus:ring-yellow-400"
            aria-label="Aumentar tamanho da letra"
          >
            <ZoomIn className="w-6 h-6" /> A+
          </button>

          <button
            onClick={() => {
              toggleHighContrast();
              speakText(highContrast ? "Contraste normal ativado" : "Alto contraste ativado");
            }}
            className="flex items-center gap-1 bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl text-lg hover:bg-yellow-300 transition focus:ring-4 focus:ring-white"
            aria-label="Alternar modo de alto contraste"
          >
            <Contrast className="w-6 h-6" />
            {highContrast ? "Modo Normal" : "Alto Contraste"}
          </button>
        </div>
      </div>
    </header>
  );
}