import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { userid: '', email: '', bio: '', interestTopics: [], activity: [], expert: [], badges: {} }
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectuserid = state => state.userid.value
export const selectbio = state => state.bio.value
export const selectactivity = state => state.activity.value
export const selectexpert = state => state.expert.value
export const selectbadges = state => state.badges.value
export const selectinterestTopics = state => state.interestTopics.value

export default usersSlice.reducer