import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    videoconferencias: [],
    loading: false,
    error: null
}

export const videoconferenciaSlice = createSlice({
    name: 'videoconferencia',
    initialState,
    reducers: {
        cadastrar: (state, action) => {
            state.videoconferencias.push(action.payload)
        }
    },
    extraReducers(builder) {
        builder
        .addCase(fetchVideoconferencias.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchVideoconferencias.fulfilled, (state, action) => {
            state.loading = false
            state.videoconferencias = action.payload.data
        })
        .addCase(fetchVideoconferencias.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        .addCase(cadastrarVideoconferencia.pending, (state, action) => {
            state.loading = true
        })
        .addCase(cadastrarVideoconferencia.fulfilled, (state, action) => {
            state.loading = false
            state.videoconferencias.push(action.payload.data)
        })
        .addCase(cadastrarVideoconferencia.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export const { cadastrar } = videoconferenciaSlice.actions

export const cadastrarVideoconferencia = createAsyncThunk(
    'videoconferencia/cadastrarVideoconferencia',
    async videoconferencia => {
        const response = await axios.post('/api/videoconferencia', videoconferencia)
        return response.data
    }
)

export const fetchVideoconferencias = createAsyncThunk(
    'videoconferencia/fetchVideoconferencias',
    async () => {
        const response = await axios.get('/api/videoconferencia')
        return response.data
    }
)

export default videoconferenciaSlice.reducer