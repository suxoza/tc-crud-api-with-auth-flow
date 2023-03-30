import axios from 'axios'
import request from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '../../features/interfaces/userInterface'
import { AxiosErrorResponce } from '../../features/interfaces/onRequestError'
import Auth from '../../features/libs/Auth'
import baseConfig from '../../config'


const onError = (error: any, rejectWithValue: any) => {
  if (request.isAxiosError(error) && error?.response && error?.response.data.message) {
    return rejectWithValue(error?.response.data.message)
  } else {
    return rejectWithValue((error as AxiosErrorResponce).message)
  }
}

const headers = {
  headers: baseConfig.defaultHeader
}

export const userLogin = createAsyncThunk( 'user/login', async (userObject: User, { rejectWithValue }) => {
    
  return new Promise((resolve, reject) => {
      axios.post(`${baseConfig.apiUrl}/api/user/login`,  userObject, headers).then((data: any) => {
        Auth.getInstance().storage = data
        resolve(Auth.getInstance().storage as any)
      }).catch(error => {
        onError(error, rejectWithValue)
        reject(error)
      })
    })
    
  }
)

export const registerUser = createAsyncThunk('user/register', async (userObject: User, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
        axios.post(`${baseConfig.apiUrl}/api/user/register`,  userObject, headers).then((data: any) => {
          Auth.getInstance().storage = data
          resolve(Auth.getInstance().storage as any)
        }).catch(error => {
          onError(error, rejectWithValue)
          reject(error)
        })
    })
  }
)