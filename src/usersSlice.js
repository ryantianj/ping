import { createSlice } from '@reduxjs/toolkit';

import { usersCollection } from '../api/firebase';

const initialState = [
    { 
        hasData: false, 
        // userid: '', 
        email: '', 
        bio: '', 
        interests: [], 
        activity: [], 
        expert: [], 
        badges: {} 
    }
]

const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {     
        updateUserState: (state, action) => {
            console.log(action)
            console.log(action.payload.data())
            const userData = action.payload.data();
            return {
                ...state,
                user: {
                    ...state.user,
                        // userid: ,
                        hasData: true,
                        email: userData.email,
                        bio: userData.bio,
                        interests: userData.interests,
                        activity: userData.activityLog,
                        expert: userData.expert,
                        badges: userData.badges
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
            dispatch(updateUserState(user))
        } catch (error) {
            // If something went wrong, handle it here
            console.log(error);
        }
    }
}

export const hasData = state => state.hasData.value === true;
export const selectuserid = state => state.userid.value;
export const selectbio = state => state.bio.value;
export const selectactivity = state => state.activity.value;
export const selectexpert = state => state.expert.value;
export const selectbadges = state => state.badges.value;
export const selectinterests = state => state.interests.value;

export const { updateUserState } = usersSlice.actions;

export default usersSlice.reducer;