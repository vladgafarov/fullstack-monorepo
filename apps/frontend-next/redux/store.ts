import { api } from '@api/api'
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { userReducer } from './user'

export const store = configureStore({
   reducer: {
      [api.reducerPath]: api.reducer,
      user: userReducer,
   },
   middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(api.middleware),
   devTools: true,
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>
