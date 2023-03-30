import { createSlice } from '@reduxjs/toolkit'
import { Post } from 'features/interfaces/postInterface'
import { 
  listAll,
  deletePost,
  editPost,
  newPost
} from './postsActions'


interface InitialState {
  postLoading: Boolean,
  error?: any,
  success?: any,
  list: Array<Post>[]
}

const initialState: InitialState = {
  postLoading: false,
  error: null,
  success: false,
  list: [],
}

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: builder => {

    // list
    builder.addCase(listAll.pending, (state) => {
        state.postLoading = true
    });

    builder.addCase(listAll.fulfilled, (state, action: any) => {
        state.list = action.payload?.data
        state.postLoading = false
      });
      
      builder.addCase(listAll.rejected, (state, action) => {
        state.postLoading = false
    });

    // edit
    builder.addCase(editPost.pending, (state) => {
        state.postLoading = true
    });

    builder.addCase(editPost.rejected, (state) => {
        state.postLoading = false
    });


    // new 
    builder.addCase(newPost.pending, (state) => {
        state.postLoading = true
    });
      
    builder.addCase(newPost.rejected, (state) => {
        state.postLoading = false
    });

    // delete 
    builder.addCase(deletePost.pending, (state) => {
        state.postLoading = true
    });
      
    builder.addCase(deletePost.rejected, (state) => {
        state.postLoading = false
    });

  }
})

export default postSlice.reducer