import React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | LUMENS",
    default: "LUMENS | Cinematic Travel Scout",
  },
  description:
    "Descubre el mundo a través de una lente cinematográfica. Encuentra locaciones de peliculas y los mejores encuadres para tus viajes",
  keywords: ["travel", "cinema", "photography", "locations", "turismo", "cine"],
  authors: [{ name: "Iham Vivanco" }],
  openGraph: {
    title: "LUMENS | Tu guía de viaje cinematográfica",
    description:
      "Encuentra los lugares más icónicos y descubre qué películas sucedieron justo donde estás parado.",
    type: "website",
    locale: "es_ES",
    siteName: "LUMENS App",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
