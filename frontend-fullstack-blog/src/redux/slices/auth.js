import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchLogin = createAsyncThunk(
	'auth/fetchLogin',
	async (params, { rejectWithValue }) => {
		try {
			const { data } = await axios.post('/auth/login', params)
			return data
		} catch (error) {
			return rejectWithValue(error.response.data.message)
		}
	}
)

export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async (params, { rejectWithValue }) => {
		try {
			const { data } = await axios.post('/auth/register', params)
			return data
		} catch (error) {
			return rejectWithValue(error.response.data.message)
		}
	}
)

export const fetchLoginMe = createAsyncThunk('auth/fetchLoginMe', async () => {
	const { data } = await axios.get('/auth/me')
	return data
})

const initialState = {
	data: null,
	status: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null
		},
	},
	extraReducers: {
		// Login
		[fetchLogin.pending]: (state) => {
			state.data = null
			state.status = 'loading'
		},
		[fetchLogin.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'resolved'
		},
		[fetchLogin.rejected]: (state) => {
			state.status = null
			state.status = 'rejected'
		},
		// Registration
		[fetchRegister.pending]: (state) => {
			state.data = null
			state.status = 'loading'
		},
		[fetchRegister.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'resolved'
		},
		[fetchRegister.rejected]: (state) => {
			state.status = null
			state.status = 'rejected'
		},
		// Get account data
		[fetchLoginMe.pending]: (state) => {
			state.data = null
			state.status = 'loading'
		},
		[fetchLoginMe.fulfilled]: (state, action) => {
			state.data = action.payload
			state.status = 'resolved'
		},
		[fetchLoginMe.rejected]: (state) => {
			state.status = null
			state.status = 'rejected'
		},
	},
})

export const selectIsAuth = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
