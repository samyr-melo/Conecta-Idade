"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, RotateCcw, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useAccessibility } from "@/context/AccessibilityContext";

const frasesTreino = [
  { meta: "Manaus", dica: "Digite a palavra 'Manaus' começando com M maiúsculo." },
  { meta: "meu.email@teste.com", dica: "Digite o endereço com o ponto e o símbolo de arroba (@)." },
  { meta: "Bom dia!", dica: "Digite 'Bom dia!' com o ponto de exclamação no final." },
];

export default function ModuloTeclado() {
  const [indice, setIndice] = useState(0);
  const [textoDigitado, setTextoDigitado] = useState("");
  const { speakText } = useAccessibility();

  const desafio = frasesTreino[indice];
  const acertou = textoDigitado.trim() === desafio.meta;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    setTextoDigitado(valor);
    if (valor.trim() === desafio.meta) {
      confetti({ particleCount: 80, spread: 70 });
      speakText("Excelente! Você digitou perfeitamente.");
    }
  };

  const proximoDesafio = () => {
    setTextoDigitado("");
    if (indice < frasesTreino.length - 1) {
      setIndice(indice + 1);
    } else {
      setIndice(0);
    }
  };

  return (
    <div className="space-y-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xl font-bold bg-slate-200 dark:bg-zinc-800 text-slate-800 dark:text-yellow-300 px-5 py-3 rounded-2xl hover:bg-slate-300"
      >
        <ArrowLeft className="w-6 h-6" /> Voltar ao Início
      </Link>

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border-4 border-blue-500">
        <div className="flex justify-between items-center mb-4">
          <span className="font-extrabold text-blue-700 dark:text-blue-400 text-xl">
            Treino de Digitação {indice + 1} de {frasesTreino.length}
          </span>
          <button
            onClick={() => speakText(desafio.dica)}
            className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full hover:bg-blue-200"
            aria-label="Ouvir instrução do desafio"
          >
            <Volume2 className="w-7 h-7 text-blue-800 dark:text-blue-200" />
          </button>
        </div>

        <p className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-4">{desafio.dica}</p>

        <div className="bg-blue-50 dark:bg-zinc-800 p-6 rounded-2xl border-2 border-blue-200 dark:border-zinc-700 mb-6">
          <span className="text-sm font-bold uppercase tracking-wider text-blue-800 dark:text-yellow-300">
            Texto a ser digitado:
          </span>
          <div className="text-3xl font-black text-blue-950 dark:text-white mt-1 select-all font-mono">
            {desafio.meta}
          </div>
        </div>

        <label htmlFor="campo-digitacao" className="block text-xl font-bold mb-2">
          Digite no campo abaixo:
        </label>
        <input
          id="campo-digitacao"
          type="text"
          value={textoDigitado}
          onChange={handleInput}
          placeholder="Toque aqui e comece a escrever..."
          className="w-full text-2xl p-5 rounded-2xl border-4 border-blue-400 focus:border-yellow-400 focus:outline-none bg-white dark:bg-zinc-800 font-mono shadow-inner mb-6"
          autoComplete="off"
        />

        {acertou ? (
          <div className="p-6 bg-emerald-100 text-emerald-950 rounded-2xl border-2 border-emerald-500 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-2xl font-black">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" /> Muito bem! Você conseguiu!
            </div>
            <button
              onClick={proximoDesafio}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-4 rounded-2xl text-xl shadow-lg"
            >
              Próximo Treino ➔
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <span className="text-lg text-slate-600 dark:text-slate-400">
              Dica: Digite devagar, letra por letra.
            </span>
            <button
              onClick={() => setTextoDigitado("")}
              className="flex items-center gap-2 text-lg font-bold text-red-600 hover:text-red-700 p-2"
            >
              <RotateCcw className="w-5 h-5" /> Limpar campo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}