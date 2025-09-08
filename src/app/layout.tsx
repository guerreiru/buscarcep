import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buscar CEP | Consultar CEP Online",
  description:
    "Encontre o CEP de qualquer rua. Faça uma busca fácil e rápida pelo CEP de sua rua!",
  keywords:
    "CEP, Limoeiro do Norte, consulta de CEP, código postal, busca por rua",
  robots: "index",
  metadataBase: new URL("https://buscarcep.app.br"),
  openGraph: {
    title: "Buscar CEP | Consultar CEP Online",
    description:
      "Encontre o CEP de qualquer rua com facilidade. Saiba o CEP de cada rua!",
    images: ["/antevisao.png"],
    url: "https://buscarcep.app.br",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Buscar CEP",
                url: "https://buscarcep.app.br",
                description:
                  "Encontre o CEP de qualquer rua. Consulta rápida e fácil!",
              },
              null,
              2
            ),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
