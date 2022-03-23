import { CurrentUserQuery } from '@api/generated'
import { createAction } from '@reduxjs/toolkit'

export const addUser = createAction<CurrentUserQuery['currentUser']>('addUser')
export const removeUser = createAction<void>('removeUser')
