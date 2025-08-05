import type React from "react"
import type { Metadata } from "next"
import { Luckiest_Guy } from "next/font/google"
import "./globals.css"

const luckiestGuy = Luckiest_Guy({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "BOBO - The Goodest Boy on Base",
  description: "BOBO is a digital bear born on Base Network. Join the meme revolution!",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={luckiestGuy.className}>{children}</body>
    </html>
  )
}
