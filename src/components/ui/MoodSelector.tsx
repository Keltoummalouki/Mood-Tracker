'use client'

import { useDispatch } from 'react-redux'
import { setMood } from '@/redux/moodSlice'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Mood } from '@/redux/moodSlice'

export default function MoodSelector() {
    const dispatch = useDispatch()

    const handleChange = (value: Mood) => {
    dispatch(setMood(value))
    }

    return (
        <div className="max-w-sm mx-auto my-10 flex flex-col items-center font-poppins">
            <p className="bg-black dark:bg-white text-white dark:text-black font-bold text-center mb-3 font-poppins">
                Select Your Mood :
            </p>
            <Select onValueChange={handleChange}>
                <SelectTrigger className="w-full font-poppins">
                    <SelectValue placeholder="Choisis ton humeur" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="happy">😊 Happy</SelectItem>
                    <SelectItem value="sad">😢 Sad</SelectItem>
                    <SelectItem value="angry">😠 Angry</SelectItem>
                    <SelectItem value="neutral">😐 Neutral</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}
