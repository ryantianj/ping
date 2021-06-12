import { createSlice } from '@reduxjs/toolkit'

import {channelsCollection, roomsCollection} from '../api/firebase';

const initialState = [
    { 
        roomid: '', 
        roomname: '',
        type: 0, 
        users: [], 
        topics: [],
    }
]

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        updateChatRoomState: (state, action) => {
            console.log("Room id: " + action.payload.roomid)
            const roomData = action.payload.room.data();

            return {
                ...state,
                room: {
                    ...state.room,
                    roomid: action.payload.roomid,
                    roomname: roomData.roomname,
                    type: 0,
                    users: roomData.users, 
                    topics: roomData.topics
                }
            }
        },
        updateGroupRoomState: (state, action) => {
            console.log("Room id: " + action.payload.roomid)
            const roomData = action.payload.room.data();

            return {
                ...state,
                room: {
                    ...state.room,
                    roomid: action.payload.roomid,
                    roomname: roomData.roomname,
                    type: 1,
                    users: roomData.users, 
                    topics: roomData.topics
                }
            }
        },
        updateChannelRoomState: (state, action) => {
            console.log("Room id: " + action.payload.roomid)
            const roomData = action.payload.room.data();

            return {
                ...state,
                room: {
                    ...state.room,
                    roomid: action.payload.roomid,
                    roomname: roomData.roomname,
                    type: 2,
                    users: roomData.users,
                    topics: roomData.topics,
                }
            }
        }
    }
})

// the outside "thunk creator" function
export const fillChatRoomState = roomid => {
    // the inside "thunk function"
    return async (dispatch, getState) => {
        try {
            // make an async call in the thunk

            const room = await roomsCollection.doc(roomid).get();
            // dispatch an action when we get the response back
            await dispatch(
                updateChatRoomState(
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

// the outside "thunk creator" function
export const fillGroupRoomState = roomid => {
    // the inside "thunk function"
    return async (dispatch, getState) => {
        try {
            // make an async call in the thunk

            const room = await roomsCollection.doc(roomid).get();
            // dispatch an action when we get the response back
            await dispatch(
                updateGroupRoomState(
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

// the outside "thunk creator" function
export const fillChannelRoomState = roomid => {
    // the inside "thunk function"
    return async (dispatch, getState) => {
        try {
            // make an async call in the thunk

            const room = await channelsCollection.doc(roomid).get();
            // dispatch an action when we get the response back
            await dispatch(
                updateChannelRoomState(
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

export const { updateChatRoomState, updateGroupRoomState, updateChannelRoomState } = roomsSlice.actions;

export default roomsSlice.reducer;