import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Mood = 'happy' | 'sad' | 'angry' | 'neutral' | ''

interface MoodState {
    currentMood: Mood
    history: Mood[]
}

const initialState: MoodState = {
    currentMood : '',
    history: [],
}

export const moodSlice = createSlice({
    name: 'mood',
    initialState,
    reducers: {
        setMood: (state, action: PayloadAction<Mood>) => {
            state.currentMood = action.payload
            if(action.payload !== ''){
                state.history.push(action.payload)
            }
        },
        clearHistory: (state) => {
            state.history = []
        },
    },
})

export const { setMood , clearHistory } = moodSlice.actions
export default moodSlice.reducer