import { configureStore } from '@reduxjs/toolkit'
import CombinedReducers from './reducers'
 
export default configureStore({
    reducer: CombinedReducers,
    devTools: true
   /*  typeof window !== 'undefined' ? 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    : null */
})

