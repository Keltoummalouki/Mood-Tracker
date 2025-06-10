'use client'

import { useDispatch } from 'react-redux'
import { setMood } from '@/redux/moodSlice'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'
import { Heart, Zap } from 'lucide-react'
import type { Mood } from '@/redux/moodSlice'

const moodOptions = [
    { value: 'happy', emoji: '😊', label: 'Happy', color: 'text-yellow-500' },
    { value: 'sad', emoji: '😢', label: 'Sad', color: 'text-blue-500' },
    { value: 'angry', emoji: '😠', label: 'Angry', color: 'text-red-500' },
    { value: 'neutral', emoji: '😐', label: 'Neutral', color: 'text-gray-500' },
]

export default function MoodSelector() {
    const dispatch = useDispatch()

    const handleChange = (value: Mood) => {
        dispatch(setMood(value))
    }

    return (
        <motion.div 
            className="max-w-md mx-auto my-12 flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            <motion.div 
                className="text-center mb-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            >
                <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-3xl shadow-xl mb-4">
                    <Heart className="w-6 h-6 animate-pulse" />
                    <h3 className="font-bold text-xl">
                        How are you feeling?
                    </h3>
                    <Zap className="w-6 h-6 animate-bounce" />
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Select your current mood to track your emotional journey
                </p>
            </motion.div>

            <motion.div 
                className="w-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
            >
                <Select onValueChange={handleChange}>
                    <SelectTrigger className="w-full h-16 text-lg font-semibold bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-xl hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300">
                        <SelectValue 
                            placeholder="🎭 Choose your mood..." 
                            className="text-gray-500"
                        />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-2 shadow-2xl bg-white dark:bg-gray-900">
                        {moodOptions.map((mood) => (
                            <SelectItem 
                                key={mood.value} 
                                value={mood.value}
                                className="h-14 text-lg font-medium rounded-xl my-1 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-950/50 dark:hover:to-pink-950/50 transition-all duration-200"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-2xl">{mood.emoji}</span>
                                    <span className={`font-semibold ${mood.color}`}>
                                        {mood.label}
                                    </span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </motion.div>

            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full blur-3xl opacity-30 animate-pulse" />
        </motion.div>
    )
}
