import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import React, { useEffect } from 'react'

const jetbrains = JetBrains_Mono({ subsets: ['latin-ext'] })

export const metadata: Metadata = {
  title: 'accord',
  description: 'accord v2',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={jetbrains.className}>{children}</body>
    </html>
  )
}
