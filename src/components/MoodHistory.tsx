'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { clearHistory } from '@/redux/moodSlice'
import { motion } from 'framer-motion'
import { Button } from "./ui/button"

const moodData = {
  happy: { emoji: '😊', color: 'bg-yellow-200' },
  sad: { emoji: '😢', color: 'bg-blue-200' },
  angry: { emoji: '😠', color: 'bg-red-200' },
  neutral: { emoji: '😐', color: 'bg-gray-200' },
}

export default function MoodHistory() {
    const dispatch = useDispatch()
    const history = useSelector((state: RootState) => state.mood.history)

    if(history.length === 0 ) return null

    return (
    <div className="mt-12 max-w-xl w-full flex flex-col items-center">
      <h3 className="text-xl font-bold mb-4 text-white dark:text-black">Historique des moods</h3>

      <div className="grid grid-cols-2 gap-4 w-full">
        {history.map((mood, index) => {
          const m = moodData[mood as keyof typeof moodData]
          return (
            <motion.div
              key={index}
              className={`rounded-lg p-4 shadow m-2 text-center ${m.color}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="text-3xl">{m.emoji}</div>
              <div className="capitalize">{mood}</div>
            </motion.div>
          )
        })}
      </div>

      <Button
        variant="ghost"
        className="mt-6 bg-red-500 text-white hover:bg-red-100 dark:hover:bg-red-900 m-5"
        onClick={() => dispatch(clearHistory())}
      >
        Clear History
      </Button>
    </div>
    )
}