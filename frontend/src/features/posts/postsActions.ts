import axios from 'axios'
import request from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import Auth from '../../features/libs/Auth'
import { Post } from '../interfaces/postInterface'
import { AxiosErrorResponce } from '../interfaces/onRequestError'
import baseConfig from '../../config'
const onError = (error: any, rejectWithValue: any) => {
  if (request.isAxiosError(error) && error?.response && error?.response.data.message) {
    return rejectWithValue(error?.response.data.message)
  } else {
    return rejectWithValue((error as AxiosErrorResponce).message)
  }
}

const headers = {
  headers: {
    ...baseConfig.defaultHeader,
    'authorization': `Bearer ${Auth.getInstance().storage?.data?.userToken}`
  }
}

export const listAll = createAsyncThunk( 'post/listAll', async () => {
    
  return new Promise((resolve, reject) => {
      axios.get(`${baseConfig.apiUrl}/api/post`, headers).then((data: any) => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
)

export const getOne = createAsyncThunk( 'post/getOne', async (postId: number, { rejectWithValue }) => {})

export const newPost = createAsyncThunk( 'post/newPost', async (postData: Post, { rejectWithValue, dispatch }) => {
    
  return new Promise((resolve, reject) => {
      axios.post(`${baseConfig.apiUrl}/api/post`,  postData, headers).then((data: any) => {
        dispatch(listAll())
        resolve(data)
      }).catch(error => {
        onError(error, rejectWithValue)
        reject(error)
      })
    })
  }
)

export const editPost = createAsyncThunk( 'post/editPost', async (postData: Post, { rejectWithValue, dispatch }) => {
    
  return new Promise((resolve, reject) => {
      axios.patch(`${baseConfig.apiUrl}/api/post/${postData?._id}`, postData, headers).then((data: any) => {
        dispatch(listAll())
        resolve(data)
      }).catch(error => {
        onError(error, rejectWithValue)
        reject(error)
      })
    })
  }
)

export const deletePost = createAsyncThunk( 'post/deletePost', async (postId: number, { rejectWithValue, dispatch }) => {
  return new Promise((resolve, reject) => {
      axios.delete(`${baseConfig.apiUrl}/api/post/${postId}`, headers).then((data: any) => {
        dispatch(listAll())
        resolve(data)
      }).catch(error => {
        onError(error, rejectWithValue)
        reject(error)
      })
    })
  }
)
