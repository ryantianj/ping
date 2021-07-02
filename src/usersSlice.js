import { createSlice } from '@reduxjs/toolkit';

import { usersCollection } from '../api/firebase';
import {useEffect} from "react";

const initialState = [
    { 
        hasData: false, 
        uid: '', 
        email: '', 
        bio: '', 
        interests: [], 
        activity: [], 
        expert: [], 
        badges: {}, 
        rooms: [],
        channels: [],
        friends: [],
        pending: [],
        visibility: true,
        display: '',
    }
]

// const fireBaseListener = (uid) => {
//     useEffect(() => {
//         const fetchData = usersCollection.doc(uid)
//             .onSnapshot(snapshot => {
//                 console.log("slice listener")
//                 const firebase = snapshot.data()
//                 updateUserState(
//                     {
//                         user: firebase,
//                         uid: uid
//                     }
//                 )
//
//             })
//         return () => {
//             fetchData()
//         }
//     }, [])
// }

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {     
        updateUserState: (state, action) => {
            console.log(action.payload.uid)
            console.log(action.payload.user.data())
            const userData = action.payload.user.data();

            return {
                ...state,
                user: {
                    ...state.user,
                        uid: action.payload.uid,
                        hasData: userData.hasData,
                        email: userData.email,
                        bio: userData.bio,
                        interests: userData.interests,
                        activity: userData.activityLog,
                        expert: userData.expert,
                        badges: userData.badges,
                        rooms: userData.rooms,
                        channels: userData.channels,
                        friends: userData.friends,
                        pending: userData.pending,
                        visibility: userData.visibility,
                        display: userData.display,
                }
            }
        }
    }
})

// the outside "thunk creator" function
export const fillUserState = uid => {
    // the inside "thunk function"
    return async (dispatch, getState) => {
        try {
            // make an async call in the thunk

            const user = await usersCollection.doc(uid).get();
            // dispatch an action when we get the response back
            await dispatch(
                updateUserState(
                    {
                        user: user, 
                        uid: uid
                    }
                )
            )
            // fireBaseListener(uid)
        } catch (error) {
            // If something went wrong, handle it here
            console.log(error);
        }
    }
}

export const { updateUserState } = usersSlice.actions;

export default usersSlice.reducer;