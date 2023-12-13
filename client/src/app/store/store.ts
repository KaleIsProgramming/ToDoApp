'use client';
import { configureStore } from '@reduxjs/toolkit'
import tasksSlice from './slices/tasks.slice';
import userSlice from './slices/user.slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      tasksSlice,
      userSlice
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
  })
}


export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
