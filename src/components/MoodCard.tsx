'use client'

import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { setMood } from "@/redux/moodSlice"
import { motion } from 'framer-motion'
import gsap from "gsap"
import { Button } from "./ui/button"

const moodData = {
  happy: { emoji: '😊', color: 'bg-yellow-200' },
  sad: { emoji: '😢', color: 'bg-blue-200' },
  angry: { emoji: '😠', color: 'bg-red-200' },
  neutral: { emoji: '😐', color: 'bg-gray-200' },
}

export default function MoodCard() {
    const dispatch = useDispatch()
    const currentMood = useSelector((state: RootState) => state.mood.currentMood)
    const cardRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { scale: 0.6, rotate: -10, opacity: 0 },
                {
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)',
                }
            )
        }
    }, [currentMood])

    if(!currentMood) return null

    const mood = moodData[currentMood as keyof typeof moodData]

    return (
    <motion.div 
        ref={cardRef}
        key={currentMood}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.4 }}
        className={`m-7 rounded-2xl p-6 ml-22 shadow-lg w-60 text-center ${mood.color}`}
        
    >
        <div className="text-5xl mb-4">{mood.emoji}</div>
        <h2 className="text-xl font-bold capitalize">{currentMood}</h2>

      <Button
        variant="outline"
        className="text-black dark:text-white border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 "
        onClick={() => dispatch(setMood(''))}
      >
        Reset Mood
      </Button>
    </motion.div>
    )
}