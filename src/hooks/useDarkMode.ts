import { useEffect, useState } from 'react'

export default function useDarkMode() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = window.document.documentElement
    const initialTheme = localStorage.getItem('theme') as 'light' | 'dark' | null

    if (initialTheme) {
      setTheme(initialTheme)
      root.classList.toggle('dark', initialTheme === 'dark')
    }
  }, [])

  const toggleTheme = () => {
    const root = window.document.documentElement
    const isDark = theme === 'dark'

    root.classList.toggle('dark', !isDark)
    const newTheme = isDark ? 'light' : 'dark'

    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  return [theme, toggleTheme] as const
}
