'use client'

import MoodSelector from "@/components/ui/MoodSelector"
import MoodCard from "@/components/MoodCard"
import MoodHistory from "@/components/MoodHistory"
import Header from '@/components/layouts/Header'

export default function Home() {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col items-center">
            <Header />
            <main className=" bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center flex-1 w-full">
                <div className=" bg-black dark:bg-white text-white dark:text-black rounded-3xl w-1/2 h-1/2">
                    <MoodSelector />
                    <MoodCard />
                    <MoodHistory />
                </div>
            </main>
        </div>
    )
}