import type { Metadata } from "next";
import "./globals.css";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { AccessibilityToolbar } from "@/components/AccessibilityToolbar";

export const metadata: Metadata = {
  title: "Conecta Idade - Alfabetização Digital",
  description: "Plataforma acessível para alfabetização digital de idosos - UNINTER ADS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <AccessibilityProvider>
          <AccessibilityToolbar />
          <main className="max-w-5xl mx-auto p-4 sm:p-6">{children}</main>
        </AccessibilityProvider>
      </body>
    </html>
  );
}