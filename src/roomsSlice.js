import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    { roomid: '', type: 0, users: [], tags: [] }
]

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {}
})

export const selectroomid = state => state.roomid.value
export const selecttype = state => state.type.value
export const selectusers = state => state.users.value
export const selecttags = state => state.tags.value


export default roomsSlice.reducer