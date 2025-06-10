'use client'

import { useDispatch } from 'react-redux'
import { setMood } from '@/redux/moodSlice'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function MoodSelector() {
    const dispatch = useDispatch()

    const handleChange = ( value: string) => {
        dispatch(setMood(value as any))
    }

    return (
        <div className="max-w-sm mx-auto my-10" >
            <p className=' bg-black dark:bg-white text-white dark:text-black ml-2 font-bold '>Select Your Mood : </p>
            <Select onValueChange={handleChange}>
                <SelectTrigger className="w-full">
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
