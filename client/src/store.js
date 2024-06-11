import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'

let preloadedState
const categories= ['tennis', 'surf boards', 'soccer', 'bikes', 'paddle boards', 'snowboards', 'volleyball', 'kayaks', 'backpacking', 'football']

preloadedState={
    categories:categories
}

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    }, 
    preloadedState: preloadedState
  })
