import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: {},
    users: [],
    loading: false,
    success: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authenticationIsLoading: (state, action) => { state.loading = action.payload }
    },
    extraReducers(builder) {
        builder
            .addCase(getUsers.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.users = action.payload.data
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.error.message
            })
            .addCase(getUserById.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.user = action.payload.data
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.error.message
            })
            .addCase(createUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.users.push(action.payload.data)
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.error.message
            })
    }
})

export const createUser = createAsyncThunk(
    'user/createUser',
    async userData => {
        const response = await axios.post('/api/user', userData)
        return response.data
    }
)

export const getUsers = createAsyncThunk(
    'user/getUsers',
    async () => {
        const response = await axios.get('/api/user')
        return response.data
    }
)

export const getUserById = createAsyncThunk(
    'user/getUserById',
    async (id) => {
        const response = await axios.get(`/api/user/${id}`)
        return response.data
    }
)

export const { authenticationIsLoading } =  userSlice.actions

export default userSlice.reducer