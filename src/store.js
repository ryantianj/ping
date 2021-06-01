import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import roomsReducer from './roomsSlice'

export default configureStore({
  reducer: {
    user: usersReducer,
    room: roomsReducer
  }
})