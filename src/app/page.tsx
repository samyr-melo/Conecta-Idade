"use client";

import Link from "next/link";
import { Compass, Keyboard, ShieldCheck, Volume2 } from "lucide-react";
import { useAccessibility } from "@/context/AccessibilityContext";

export default function Home() {
  const { speakText } = useAccessibility();

  const modulos = [
    {
      id: "icones",
      titulo: "1. Conhecendo a Internet",
      descricao: "Aprenda o significado dos botões e ícones que você vê na tela.",
      icone: Compass,
      cor: "bg-emerald-600 hover:bg-emerald-700 text-white",
      link: "/modulo-icones",
    },
    {
      id: "teclado",
      titulo: "2. Treinando a Digitação",
      descricao: "Pratique o uso do teclado no seu ritmo, sem pressa e sem medo de errar.",
      icone: Keyboard,
      cor: "bg-blue-600 hover:bg-blue-700 text-white",
      link: "/modulo-teclado",
    },
    {
      id: "seguranca",
      titulo: "3. Formulários e Segurança",
      descricao: "Simule cadastros com segurança e descubra o que nunca deve ser digitado.",
      icone: ShieldCheck,
      cor: "bg-amber-600 hover:bg-amber-700 text-white",
      link: "/modulo-seguranca",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-md border-2 border-slate-200">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-blue-950 dark:text-yellow-300">
            Bem-vindo ao seu espaço de aprendizado!
          </h1>
          <button
            onClick={() =>
              speakText(
                "Bem-vindo ao seu espaço de aprendizado. Escolha uma das três atividades abaixo para começar no seu tempo."
              )
            }
            className="p-3 bg-slate-100 dark:bg-zinc-800 rounded-full hover:bg-slate-200 transition"
            title="Ouvir instrução"
            aria-label="Ouvir instrução da página"
          >
            <Volume2 className="w-8 h-8 text-blue-800 dark:text-yellow-300" />
          </button>
        </div>
        <p className="mt-3 text-slate-700 dark:text-slate-200 font-medium">
          Aqui você aprende a usar o celular e o computador de forma segura, com calma e autonomia. Toque em uma das opções abaixo:
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modulos.map((mod) => {
          const Icon = mod.icone;
          return (
            <Link
              key={mod.id}
              href={mod.link}
              className={`flex flex-col justify-between p-6 rounded-3xl shadow-lg border-4 border-transparent transition-all transform hover:-translate-y-1 hover:border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 ${mod.cor}`}
            >
              <div>
                <div className="bg-white/20 p-4 rounded-2xl w-fit mb-4">
                  <Icon className="w-12 h-12" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{mod.titulo}</h2>
                <p className="opacity-95 font-medium">{mod.descricao}</p>
              </div>

              <div className="mt-6 font-extrabold text-xl bg-black/20 text-center py-3 rounded-2xl">
                Começar Atividade ➔
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}