import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

import { setupListeners } from '@reduxjs/toolkit/query'

import { sportingGoodsApi } from './services/sportingGoodsApi'

export const store = configureStore({
    reducer: {
        user: userReducer,
        [sportingGoodsApi.reducerPath]: sportingGoodsApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(sportingGoodsApi.middleware)
})

setupListeners(store.dispatch)