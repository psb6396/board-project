import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { registerUser } from '../api/snsApi'

export const registerUserThunk = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
   try {
      const response = await registerUser(userData)
      return response.data.user
   } catch (error) {
      return rejectWithValue(error.response?.data?.message || '회원가입실패')
   }
})

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      //서버에서 가져오는 데이터가 배열 일때만 []로 초깃값을 주고 나머지는 null로 준다
      //null은 주로 문자열 혹은 json 객체 데이터일때 사용
      user: null,
      loading: false,
      error: null,
   },
   reducers: {},
   extraReducers: {},
   extraReducers: (builder) => {
      //회원가입
      builder.addCase(registerUserThunk.pending, (state) => {
         state.loading = true
         state.error = null
      })
      builder.addCase(registerUserThunk.fulfilled, (state, action) => {
         state.loading = false
         state.user = action.payload
      })
      builder.addCase(registerUserThunk.rejected, (state, action) => {
         state.loading = true
         state.error = action.payload
      })
   },
})

export default authSlice.reducer