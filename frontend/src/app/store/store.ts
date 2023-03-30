import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../features/auth/authSlice'
import { authApi } from '../../app/services/authService'

import postReducer from '../../features/posts/postSlice'



const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,

    posts: postReducer,

  },
  //middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(authApi.middleware),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export default store