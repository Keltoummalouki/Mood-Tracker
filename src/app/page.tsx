'use client'

import { motion } from "framer-motion"
import MoodSelector from "@/components/ui/MoodSelector"
import MoodCard from "@/components/MoodCard"
import MoodHistory from "@/components/MoodHistory"
import Header from '@/components/layouts/Header'

export default function Home() {
    return (
        <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className=""
            >
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center">
            <Header />
            <main className=" bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center flex-1 w-full">
                <div className=" bg-black dark:bg-white text-white dark:text-black rounded-3xl w-1/2 h-1/2 items-center justify-center">
                    <MoodSelector />
                    <MoodCard />
                    <MoodHistory />
                </div>
            </main>
        </div>
        </motion.main>
    )
}