import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

let preloadedState
const categories= ['tennis', 'surf boards', 'soccer', 'bikes', 'paddle boards', 'snowboards', 'volleyball', 'kayaks', 'backpacking', 'football']

preloadedState={
    categories:categories
}

export const store = configureStore({
    reducer: {
        user: userReducer,
    }, 
    preloadedState: preloadedState
  })
