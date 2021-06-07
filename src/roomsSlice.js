import { createSlice } from '@reduxjs/toolkit'

import { roomsCollection } from '../api/firebase';

const initialState = [
    { 
        roomid: '', 
        roomname: '',
        type: 0, 
        users: [], 
        topics: [] 
    }
]

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        updateRoomState: (state, action) => {
            console.log("Room id: " + action.payload.roomid)
            const roomData = action.payload.room.data();

            return {
                ...state,
                room: {
                    ...state.room,
                    roomid: action.payload.roomid,
                    roomname: roomData.roomname,
                    type: roomData.type,
                    users: roomData.users, 
                    topics: roomData.topics
                }
            }
        }
    }
})

// the outside "thunk creator" function
export const fillRoomState = roomid => {
    // the inside "thunk function"
    return async (dispatch, getState) => {
        try {
            // make an async call in the thunk

            const room = await roomsCollection.doc(roomid).get();
            // dispatch an action when we get the response back
            await dispatch(
                updateRoomState(
                    {
                        room: room,
                        roomid: roomid
                    }
                )
            )
        } catch (error) {
            // If something went wrong, handle it here
            console.log(error);
        }
    }
}

export const { updateRoomState } = roomsSlice.actions;

export default roomsSlice.reducer;