'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { clearHistory } from '@/redux/moodSlice'
import { motion } from 'framer-motion'
import { Button } from "./ui/button"

const moodData = {
  happy: { emoji: '😊', color: 'bg-yellow-200' },
  sad: { emoji: '😢', color: 'bg-blue-200' },
  angry: { emoji: '😠', color: 'bg-red-500' },
  neutral: { emoji: '😐', color: 'bg-gray-200' },
}

export default function MoodHistory() {
  const dispatch = useDispatch()
  const history = useSelector((state: RootState) => state.mood.history)

  if (history.length === 0) return null

  return (
    <div className="mt-12 w-full max-w-4xl flex flex-col items-center px-4">
      <h3 className="font-poppins text-2xl font-bold mb-6 text-white dark:text-black text-center ">
        Historique des Moods
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full justify-center">
        {history.map((mood, index) => {
          const m = moodData[mood as keyof typeof moodData]
          return (
            <motion.div
              key={index}
              className={`font-poppins rounded-xl px-6 py-5 shadow-md ${m.color} text-center text-black dark:text-black`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="font-poppins text-4xl mb-2">{m.emoji}</div>
              <div className="font-poppins capitalize font-medium text-lg">{mood}</div>
            </motion.div>
          )
        })}
      </div>

      <Button
        variant="destructive"
        className="mt-10 px-6 py-2 rounded-xl text-white bg-red-500 hover:bg-red-600 transition-all mb-4"
        onClick={() => dispatch(clearHistory())}
      >
        Clear History
      </Button>
    </div>
  )
}
