import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { ConnectionStatus } from "@/components/connection-status"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "All Supplies - Soluciones Estratégicas Integrales",
  description:
    "Empresa multinacional especializada en soluciones estratégicas para Energía, tecnología y seguridad y Servicios de Procura",
  keywords: ["energía", "petróleo", "procura", "servicios financieros", "consultoría", "venezuela", "panamá"],
  authors: [{ name: "All Supplies" }],
  creator: "All Supplies",
  publisher: "All Supplies",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://allsuppliesinv.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "All Supplies - Soluciones Estratégicas Integrales",
    description:
      "Empresa multinacional especializada en soluciones estratégicas para Energía, tecnología y seguridad y Servicios de Procura",
    url: "https://allsuppliesinv.com",
    siteName: "All Supplies",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "All Supplies - Soluciones Estratégicas Integrales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Supplies - Soluciones Estratégicas Integrales",
    description:
      "Empresa multinacional especializada en soluciones estratégicas para Energía, tecnología y seguridad y Servicios de Procura",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#2563eb" },
    { media: "(prefers-color-scheme: dark)", color: "#1e40af" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* PWA Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icons/icon-192x192.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/* PWA Meta Tags */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="All Supplies" />
        <meta name="application-name" content="All Supplies" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="theme-color" content="#2563eb" />

        {/* Preconnect para mejor rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className} style={{ scrollBehavior: "smooth" }}>
        <ConnectionStatus />
        {children}
        <PWAInstallPrompt />
      </body>
    </html>
  )
}
