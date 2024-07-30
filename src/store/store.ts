import { combineReducers, configureStore } from '@reduxjs/toolkit'
import weatherReducer from './weather'

const rootReducer = combineReducers({
  weather: weatherReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch