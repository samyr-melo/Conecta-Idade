"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert, CheckCircle2, AlertTriangle, Volume2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useAccessibility } from "@/context/AccessibilityContext";

export default function ModuloSeguranca() {
    const [nome, setNome] = useState("");
    const [anoNascimento, setAnoNascimento] = useState("");
    const [senhaBanco, setSenhaBanco] = useState("");
    const [alertaSeguranca, setAlertaSeguranca] = useState(false);
    const [sucesso, setSucesso] = useState(false);
    const { speakText } = useAccessibility();

    const handleSenhaBanco = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSenhaBanco(val);
        if (val.length > 0) {
            setAlertaSeguranca(true);
            speakText(
                "Atenção de segurança! Nunca digite a senha do seu banco ou cartão em formulários e sites desconhecidos!"
            );
        } else {
            setAlertaSeguranca(false);
        }
    };

    const handleSubmeter = (e: React.FormEvent) => {
        e.preventDefault();
        if (alertaSeguranca) {
            alert("Atenção: Apague o campo de senha do banco para prosseguir em segurança!");
            return;
        }
        if (nome.trim() && anoNascimento.trim()) {
            setSucesso(true);
            confetti({ particleCount: 70, spread: 60 });
            speakText("Cadastro simulado concluído com sucesso e total segurança!");
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

            <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-xl border-4 border-amber-500">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-black text-amber-900 dark:text-yellow-300 flex items-center gap-2">
                        <ShieldAlert className="w-8 h-8" /> Prática de Cadastro e Segurança
                    </h1>
                    <button
                        onClick={() =>
                            speakText(
                                "Neste exercício, preencha apenas o seu nome e ano. Observe o aviso importante se tentar digitar uma senha bancária."
                            )
                        }
                        className="p-3 bg-amber-100 dark:bg-zinc-800 rounded-full hover:bg-amber-200"
                        aria-label="Ouvir instruções de segurança"
                    >
                        <Volume2 className="w-7 h-7 text-amber-800 dark:text-yellow-300" />
                    </button>
                </div>

                <p className="text-xl font-medium text-slate-700 dark:text-slate-300 mb-6">
                    Preencha a simulação de cadastro. Lembre-se: em sites comuns, nunca digite senhas de banco ou códigos do celular!
                </p>

                <form onSubmit={handleSubmeter} className="space-y-6">
                    <div>
                        <label className="block text-xl font-bold mb-2 text-slate-900 dark:text-white">
                            1. Como gostaria de ser chamado(a)?
                        </label>
                        <input
                            type="text"
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Ex: Dona Maria ou Seu José"
                            className="w-full text-xl p-4 rounded-xl border-2 border-slate-400 dark:border-zinc-600 focus:border-amber-500 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-400"
                        />
                    </div>

                    <div>
                        <label className="block text-xl font-bold mb-2 text-slate-900 dark:text-white">
                            2. Qual é o ano do seu nascimento?
                        </label>
                        <input
                            type="number"
                            required
                            value={anoNascimento}
                            onChange={(e) => setAnoNascimento(e.target.value)}
                            placeholder="Ex: 1955"
                            className="w-full text-xl p-4 rounded-xl border-2 border-slate-400 dark:border-zinc-600 focus:border-amber-500 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-400"
                        />
                    </div>

                    {/* Campo de armadilha didática */}
                    <div className="bg-red-50 dark:bg-red-950/40 p-5 rounded-2xl border-2 border-red-300 dark:border-red-600">
                        <label className="block text-xl font-bold text-red-900 dark:text-red-300 mb-2">
                            ⚠️ Teste de Golpe: "Digite aqui a senha do seu cartão"
                        </label>
                        <input
                            type="password"
                            value={senhaBanco}
                            onChange={handleSenhaBanco}
                            placeholder="NÃO DIGITE! Campo de teste didático"
                            className="w-full text-xl p-4 rounded-xl border-2 border-red-400 dark:border-red-500 focus:border-red-600 bg-white dark:bg-zinc-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-400"
                        />

                        {alertaSeguranca && (
                            <div className="mt-4 p-4 bg-red-600 text-white rounded-xl flex items-start gap-3">
                                <AlertTriangle className="w-8 h-8 shrink-0 text-yellow-300" />
                                <div className="text-lg font-bold">
                                    PERIGO! Sites de cadastros e mensagens de WhatsApp NUNCA pedem a senha do seu banco.
                                    Apague o campo acima para prosseguir com segurança!
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black text-2xl py-5 rounded-2xl shadow-lg transition"
                    >
                        Concluir Simulação Segura ➔
                    </button>
                </form>

                {sucesso && (
                    <div className="mt-6 p-6 bg-emerald-100 text-emerald-950 rounded-2xl border-2 border-emerald-500 flex flex-col items-center text-center">
                        <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-2" />
                        <h2 className="text-2xl font-black mb-1">Excelente, {nome}!</h2>
                        <p className="text-xl">
                            Você concluiu a simulação sem expor dados sigilosos e aprendeu a identificar armadilhas na web[cite: 1]!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}