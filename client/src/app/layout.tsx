import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Providers from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ToDoApp',
  description: 'ToDoApp lol',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className='bg-purple' lang="en">
      <body className={inter.className}><Providers>{children}</Providers></body>
    </html>
  )
}
