import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Condominio Rozas 1030 | Inmobiliaria LAYEL',
  description: 'Venta de viviendas modernas con tecnología Metalcon en Concepción. Alta eficiencia, rapidez y seguridad estructural.',
  keywords: ['inmobiliaria concepción', 'viviendas metalcon', 'condominio rozas 1030', 'inmobiliaria layel', 'vivienda unifamiliar'],
  authors: [{ name: 'Inmobiliaria LAYEL' }],
  openGraph: {
    title: 'Condominio Rozas 1030 | Eficiencia y Modernidad',
    description: 'Descubre el futuro de la construcción en el corazón de Concepción.',
    url: 'https://hassler-portal.vercel.app',
    siteName: 'Condominio Rozas 1030',
    locale: 'es_CL',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
