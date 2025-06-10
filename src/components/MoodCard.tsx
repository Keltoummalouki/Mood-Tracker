'use client'

import { useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { setMood } from "@/redux/moodSlice"
import { motion } from 'framer-motion'
import gsap from "gsap"
import { Button } from "./ui/button"
import { RotateCcw } from 'lucide-react'

const moodData = {
  happy: { 
    emoji: '😊', 
    color: 'from-yellow-400 to-orange-400',
    shadow: 'shadow-yellow-200 dark:shadow-yellow-900/50',
    glow: 'shadow-yellow-400/50'
  },
  sad: { 
    emoji: '😢', 
    color: 'from-blue-400 to-cyan-400',
    shadow: 'shadow-blue-200 dark:shadow-blue-900/50',
    glow: 'shadow-blue-400/50'
  },
  angry: { 
    emoji: '😠', 
    color: 'from-red-400 to-pink-400',
    shadow: 'shadow-red-200 dark:shadow-red-900/50',
    glow: 'shadow-red-400/50'
  },
  neutral: { 
    emoji: '😐', 
    color: 'from-gray-400 to-slate-400',
    shadow: 'shadow-gray-200 dark:shadow-gray-900/50',
    glow: 'shadow-gray-400/50'
  },
}

export default function MoodCard() {
    const dispatch = useDispatch()
    const currentMood = useSelector((state: RootState) => state.mood.currentMood)
    const cardRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if(cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { scale: 0.8, rotateY: -180, opacity: 0 },
                {
                    scale: 1,
                    rotateY: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'back.out(1.7)',
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
            initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateX: 90 }}
            transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
            className={`relative mx-auto mb-8 w-80 max-w-[90vw]`}
        >
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${mood.color} rounded-3xl blur-xl opacity-30 animate-pulse`} />
            
            {/* Main card */}
            <div className={`relative bg-gradient-to-br ${mood.color} rounded-3xl p-8 ${mood.shadow} shadow-2xl backdrop-blur-sm border border-white/20`}>
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full animate-ping" />
                <div className="absolute top-6 right-8 w-2 h-2 bg-white/20 rounded-full" />
                
                {/* Emoji with enhanced styling */}
                <div className="text-center mb-6">
                    <motion.div 
                        className="text-8xl mb-4 filter drop-shadow-lg"
                        animate={{ 
                            rotate: [0, -5, 5, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        {mood.emoji}
                    </motion.div>
                    
                    <motion.h2 
                        className="text-3xl font-bold capitalize text-white drop-shadow-md tracking-wide"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {currentMood}
                    </motion.h2>
                    
                    <motion.p 
                        className="text-white/80 text-sm mt-2 font-medium"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Current mood selected
                    </motion.p>
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center"
                >
                    <Button
                        variant="outline"
                        className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30 hover:scale-105 transition-all duration-300 font-semibold px-6 py-3 rounded-2xl shadow-lg"
                        onClick={() => dispatch(setMood(''))}
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset Mood
                    </Button>
                </motion.div>
            </div>
        </motion.div>
    )
}
