'use client'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Button } from "../ui/button"
import useDarkMode from '@/hooks/useDarkMode'
import { Moon, Sun, Calendar, Flame, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

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
        <motion.header 
            className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200/50 dark:border-gray-800/50 shadow-lg"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        >
            <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
                <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="relative">
                        <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
                        <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-30 animate-ping" />
                    </div>
                    <h1 className="text-black dark:text-white font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Mood Tracker
                    </h1>
                </motion.div>

                <div className="flex items-center gap-3">
                    {/* Date display */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Button
                            variant="outline"
                            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-semibold shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                        >
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>{today}</span>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Button
                            variant="outline"
                            className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300 font-semibold shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
                        >
                            <Flame className="w-4 h-4 mr-2" />
                            <span>{moodHistory.length}</span>
                            <span className="hidden sm:inline ml-1">mood{moodHistory.length !== 1 ? 's' : ''}</span>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Button
                            variant="ghost"
                            onClick={toggleTheme}
                            className="relative w-12 h-12 rounded-full bg-gradient-to-r from-yellow-100 to-blue-100 dark:from-yellow-900/30 dark:to-blue-900/30 hover:from-yellow-200 hover:to-blue-200 dark:hover:from-yellow-800/50 dark:hover:to-blue-800/50 border border-yellow-200 dark:border-yellow-800 shadow-sm hover:shadow-md hover:scale-110 transition-all duration-300"
                        >
                            <motion.div
                                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                            >
                                {theme === 'dark' ? 
                                    <Sun className="w-5 h-5 text-yellow-500" /> : 
                                    <Moon className="w-5 h-5 text-blue-600" />
                                }
                            </motion.div>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </motion.header>
    )
}
