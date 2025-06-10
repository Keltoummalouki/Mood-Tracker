'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Button } from "../ui/button"
import useDarkMode from '@/hooks/useDarkMode'
import { Moon, Sun } from 'lucide-react'

export default function Header() {

    const [today, setToday] = useState("")
    const moodHistory = useSelector((state: RootState) => state.mood.history)
    const [theme, toggleTheme] = useDarkMode()


    useEffect(() => {
        const date = new Date()
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: '2-digit'
        }

        const formatted = date.toLocaleDateString('en-US', options)
        setToday(formatted)
    }, [])

    return (
    <header className="sticky top-0 z-50 w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-black rounded-xl shadow mb-8">
      <h1 className="text-black dark:text-white font-bold text-2xl">Mood Tracker</h1>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="bg-white dark:bg-neutral-900 text-gray-700 dark:text-white font-semibold shadow-none hover:bg-purple-100 flex items-center gap-2"
        >
          <span>{today}</span>
          <span className="text-purple-500 text-lg">📅</span>
        </Button>

        <Button
          variant="outline"
          className="bg-white dark:bg-neutral-900 text-orange-500 font-semibold shadow-none hover:bg-orange-100 flex items-center gap-2"
        >
          <span className="text-xl">🔥</span>
          <span>{moodHistory.length}</span>
        </Button>

        <Button
          variant="ghost"
          onClick={toggleTheme}
          className="text-lg text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-neutral-800"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>
    </header>
    )
}
