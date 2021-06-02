import { createSlice } from '@reduxjs/toolkit';

import { usersCollection } from '../api/firebase';

const initialState = [
    { 
        hasData: false, 
        uid: '', 
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
            console.log(action.payload.uid)
            console.log(action.payload.user.data())
            const userData = action.payload.user.data();

            return {
                ...state,
                user: {
                    ...state.user,
                        uid: action.payload.uid,
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
            await dispatch(
                updateUserState(
                    {
                        user: user, 
                        uid: uid
                    }
                )
            )
        } catch (error) {
            // If something went wrong, handle it here
            console.log(error);
        }
    }
}

export const hasData = state => state.user.hasData.value === true;
export const selectuid = state => state.user.uid.value;
export const selectbio = state => state.user.bio.value;
export const selectactivity = state => state.user.activity.value;
export const selectexpert = state => state.user.expert.value;
export const selectbadges = state => state.user.badges.value;
export const selectinterests = state => state.user.interests.value;

export const { updateUserState } = usersSlice.actions;

export default usersSlice.reducer;