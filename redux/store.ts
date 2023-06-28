import { configureStore } from '@reduxjs/toolkit'
import CombinedReducers from './reducers'
 
const store = configureStore({
    reducer: CombinedReducers,
    devTools: true
})

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store