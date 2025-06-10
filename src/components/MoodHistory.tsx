'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { clearHistory } from '@/redux/moodSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "./ui/button"
import { Trash2, TrendingUp } from 'lucide-react'

const moodData = {
  happy: { 
    emoji: '😊', 
    color: 'from-yellow-400 to-orange-400',
    name: 'Happy'
  },
  sad: { 
    emoji: '😢', 
    color: 'from-blue-400 to-cyan-400',
    name: 'Sad'
  },
  angry: { 
    emoji: '😠', 
    color: 'from-red-400 to-pink-400',
    name: 'Angry'
  },
  neutral: { 
    emoji: '😐', 
    color: 'from-gray-400 to-slate-400',
    name: 'Neutral'
  },
}

export default function MoodHistory() {
  const dispatch = useDispatch()
  const history = useSelector((state: RootState) => state.mood.history)

  if (history.length === 0) return null

  const moodCounts = history.reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const mostFrequentMood = Object.entries(moodCounts).reduce((a, b) => 
    moodCounts[a[0]] > moodCounts[b[0]] ? a : b
  )[0]

  return (
    <motion.div 
      className="mt-12 w-full max-w-6xl mx-auto px-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >

      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-2xl shadow-lg mb-4"
        >
          <TrendingUp className="w-5 h-5" />
          <span className="font-bold text-lg">Mood Journey</span>
        </motion.div>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {history.length} mood{history.length !== 1 ? 's' : ''} tracked • Most frequent: {moodData[mostFrequentMood as keyof typeof moodData]?.emoji} {moodData[mostFrequentMood as keyof typeof moodData]?.name}
        </motion.p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        <AnimatePresence>
          {history.map((mood, index) => {
            const m = moodData[mood as keyof typeof moodData]
            return (
              <motion.div
                key={`${mood}-${index}`}
                className="group relative"
                initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${m.color} rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                
                {/* Main card */}
                <div className={`relative bg-gradient-to-br ${m.color} rounded-2xl p-4 shadow-lg border border-white/20 backdrop-blur-sm`}>
                  {/* Index badge */}
                  <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                    {index + 1}
                  </div>
                  
                  <div className="text-center">
                    <div className="text-4xl mb-2 filter drop-shadow-sm">
                      {m.emoji}
                    </div>
                    <div className="text-white font-semibold text-sm capitalize drop-shadow-sm">
                      {m.name}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          variant="destructive"
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          onClick={() => dispatch(clearHistory())}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear History
        </Button>
      </motion.div>
    </motion.div>
  )
}