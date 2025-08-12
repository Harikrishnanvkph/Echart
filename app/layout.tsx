import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ECharts Studio - Professional Chart Builder",
  description: "Create beautiful, interactive charts with ECharts Studio. 35+ chart types, 500+ configuration options, and professional export capabilities.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'white',
              border: '1px solid #e5e7eb',
            },
          }}
        />
      </body>
    </html>
  )
}
