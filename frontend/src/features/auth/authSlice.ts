import { createSlice } from '@reduxjs/toolkit'
import { registerUser, userLogin } from './authActions'
import { User } from 'features/interfaces/userInterface'
import Auth from '../../features/libs/Auth'

interface InitialState {
  loading: Boolean,
  userInfo: User | null,
  error?: any,
  success?: any,
}


const initialState: InitialState = {
  loading: false,
  userInfo: (Auth.getInstance().storage) as User,
  error: null,
  success: false,
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state: InitialState) => {
      Auth.getInstance().remove()
      state.loading = false
      state.userInfo = null
      state.error = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(userLogin.pending, (state, action) => {
        state.loading = true
        state.error = null
    });

    builder.addCase(userLogin.fulfilled, (state, action: any ) => {
      state.loading = false
      state.success = true
      state.userInfo = action?.payload?.data
    });

    builder.addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false
        state.error = payload
    });

    // register user
    builder.addCase(registerUser.pending, (state) => {
        console.log(state)
        state.loading = true
        state.error = null
    });

    builder.addCase(registerUser.fulfilled, (state, action: any) => {
        state.loading = false
        state.success = true 
        state.userInfo = action?.payload?.data
    });

    builder.addCase(registerUser.rejected, (state, { payload }) => {
        console.log(state)
        console.log(payload)
        state.loading = false
        state.error = payload
    });
  }
})

export const { logout, setCredentials } = authSlice.actions

export default authSlice.reducer