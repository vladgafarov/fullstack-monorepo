import { CurrentUserQuery } from '@api/generated'
import { createReducer } from '@reduxjs/toolkit'
import { addUser, removeUser } from '.'

interface InitialState {
   user: CurrentUserQuery['currentUser']
}

const initialState: InitialState = {
   user: undefined,
}

export const userReducer = createReducer(initialState, builder => {
   builder.addCase(addUser, (state, action) => {
      state.user = action.payload
   })
   builder.addCase(removeUser, (state, action) => {
      state.user = undefined
   })
})
