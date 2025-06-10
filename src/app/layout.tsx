'use client'

import './globals.css'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'

export default function RootLayout({ children }: {children : ReactNode}) {
  return (
        <html lang="en" className="dark">
          <body className="bg-white dark:bg-black text-black dark:text-white">
            <Provider store={store}>
              {children}
            </Provider>
          </body>
        </html>
  )
}