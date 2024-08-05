import { combineReducers } from '@reduxjs/toolkit'
import { userApi } from './userApi';

export default function rootReducer() {
    const rootReducer = combineReducers({
        // posts: postsReducer,
        // users: usersReducer,
        [userApi.reducerPath]: userApi.reducer
      })
    return rootReducer;
}