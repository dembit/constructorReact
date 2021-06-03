import { configureStore } from '@reduxjs/toolkit'
import  ConstructorReducer  from './reducers/Constructor/ConstructorReducer'



export const store = configureStore({
  reducer: {
    ConstructorReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


