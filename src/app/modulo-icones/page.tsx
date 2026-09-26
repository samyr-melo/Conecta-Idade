"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Settings, Lock, ArrowLeft, CheckCircle2, XCircle, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useAccessibility } from "@/context/AccessibilityContext";

interface Pergunta {
  icone: any;
  pergunta: string;
  opcoes: string[];
  respostaCorreta: string;
  explicacao: string;
}

const perguntas: Pergunta[] = [
  {
    icone: Search,
    pergunta: "Para que serve este ícone que se parece com uma lupa?",
    opcoes: ["Fazer uma pesquisa ou buscar algo", "Tirar uma foto", "Desligar o aparelho"],
    respostaCorreta: "Fazer uma pesquisa ou buscar algo",
    explicacao: "A lupa sempre indica campo de pesquisa! Sempre que quiser achar uma informação, toque nela.",
  },
  {
    icone: Lock,
    pergunta: "Quando você vê este cadeado fechado ao lado de um site, o que significa?",
    opcoes: ["Site seguro com conexão protegida", "O site está quebrado", "Você foi bloqueado"],
    respostaCorreta: "Site seguro com conexão protegida",
    explicacao: "O cadeado fechado indica que sua conexão com aquela página é segura e criptografada.",
  },
  {
    icone: Settings,
    pergunta: "O que representa este desenho de engrenagem?",
    opcoes: ["Jogo de computador", "Configurações e ajustes do aparelho", "Caixa de mensagens"],
    respostaCorreta: "Configurações e ajustes do aparelho",
    explicacao: "A engrenagem serve para ajustar o brilho, som, letras ou internet do seu aparelho.",
  },
];

export default function ModuloIcones() {
  const [indice, setIndice] = useState(0);
  const [feedback, setFeedback] = useState<{ correto: boolean; texto: string } | null>(null);
  const { speakText } = useAccessibility();

  const perguntaAtual = perguntas[indice];
  const IconeComponente = perguntaAtual.icone;

  const responder = (opcao: string) => {
    if (opcao === perguntaAtual.respostaCorreta) {
      confetti({ particleCount: 70, spread: 60 });
      setFeedback({
        correto: true,
        texto: `Parabéns! Você acertou! ${perguntaAtual.explicacao}`,
      });
      speakText(`Muito bem! Você acertou! ${perguntaAtual.explicacao}`);
    } else {
      setFeedback({
        correto: false,
        texto: "Não se preocupe! Tente novamente com calma.",
      });
      speakText("Não se preocupe! Tente novamente com calma.");
    }
  };

  const proximaPergunta = () => {
    setFeedback(null);
    if (indice < perguntas.length - 1) {
      setIndice(indice + 1);
    } else {
      setIndice(0); // Reinicia para praticar novamente
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

      <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border-4 border-emerald-500">
        <div className="flex justify-between items-center mb-6">
          <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-xl">
            Exercício {indice + 1} de {perguntas.length}
          </span>
          <button
            onClick={() => speakText(perguntaAtual.pergunta)}
            className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full hover:bg-emerald-200"
            aria-label="Ouvir pergunta"
          >
            <Volume2 className="w-7 h-7 text-emerald-800 dark:text-emerald-200" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-slate-100 dark:bg-zinc-800 rounded-2xl mb-6">
          <IconeComponente className="w-24 h-24 text-emerald-600 dark:text-yellow-300 mb-4 animate-bounce" />
          <h2 className="text-2xl sm:text-3xl font-black text-center text-slate-900 dark:text-white">
            {perguntaAtual.pergunta}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {perguntaAtual.opcoes.map((opcao, i) => (
            <button
              key={i}
              onClick={() => responder(opcao)}
              className="text-left font-bold text-xl p-5 rounded-2xl border-4 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-zinc-800 transition focus:ring-4 focus:ring-emerald-400"
            >
              {opcao}
            </button>
          ))}
        </div>

        {feedback && (
          <div
            className={`mt-6 p-6 rounded-2xl flex flex-col items-center text-center font-bold ${
              feedback.correto
                ? "bg-emerald-100 text-emerald-900 border-2 border-emerald-500"
                : "bg-red-100 text-red-900 border-2 border-red-400"
            }`}
          >
            <div className="flex items-center gap-2 text-2xl mb-2">
              {feedback.correto ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
              {feedback.correto ? "Correto!" : "Ainda não"}
            </div>
            <p className="text-xl mb-4">{feedback.texto}</p>

            {feedback.correto && (
              <button
                onClick={proximaPergunta}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-4 rounded-2xl text-xl shadow-lg"
              >
                Próximo Exercício ➔
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}