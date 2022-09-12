import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: [],
    loading: false,
    success: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
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

export default userSlice.reducer