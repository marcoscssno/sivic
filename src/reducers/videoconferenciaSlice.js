import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    videoconferencias: [],
    // Temporary fix (See https://github.com/jaredpalmer/formik/issues/1033)
    videoconferencia: {
        data: '',
        hora: '',
        solicitante: '',
        sala: '',
        presos: [
            {
                nome: '',
                ala: '',
                cela: '',
                periculosidade: ''
            }
        ],
        link: '',
    },
    workingDate: null,
    loading: false,
    success: false,
    error: null,
    done: false
}

export const videoconferenciaSlice = createSlice({
    name: 'videoconferencia',
    initialState,
    reducers: {
        defineWorkingDate (state, action) {
            state.workingDate = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchVideoconferencias.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchVideoconferencias.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.videoconferencias = action.payload.data
            })
            .addCase(fetchVideoconferencias.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.error.message
            })
            .addCase(fetchVideoconferenciasByDate.pending, (state) => {
                state.loading = true
                state.done = false
            })
            .addCase(fetchVideoconferenciasByDate.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
                state.success = true
                state.videoconferencias = action.payload.data
                state.done = true
            })
            .addCase(fetchVideoconferenciasByDate.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.error.message
                state.done = true
            })
            .addCase(fetchVideoconferencia.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchVideoconferencia.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.videoconferencia = action.payload.data
                state.error = null
            })
            .addCase(fetchVideoconferencia.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.error.message
            })
            .addCase(cadastrarVideoconferencia.pending, (state, action) => {
                state.loading = true
            })
            .addCase(cadastrarVideoconferencia.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.videoconferencias.push(action.payload.data)
            })
            .addCase(cadastrarVideoconferencia.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.error.message
            })
            .addCase(editarVideoconferencia.pending, (state, action) => {
                state.loading = true
            })
            .addCase(editarVideoconferencia.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                const videoconferenciaEditada =  action.payload.data
                const { data_e_hora, sala, solicitante, link } = videoconferenciaEditada
                const videoconferenciaExistente = state.videoconferencias.find(videoconferencia => videoconferencia._id === videoconferenciaEditada._id)
                if(videoconferenciaExistente) {
                    videoconferenciaExistente.data_e_hora = data_e_hora
                    videoconferenciaExistente.sala = sala
                    videoconferenciaExistente.solicitante = solicitante
                    videoconferenciaExistente.link = link
                }
            })
            .addCase(editarVideoconferencia.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.error.message
            })
            .addCase(excluirVideoconferencia.pending, (state, action) => {
                state.loading = true
            })
            .addCase(excluirVideoconferencia.fulfilled, (state, action) => {
                state.loading = false
                state.success = true
                state.error = null
                state.videoconferencias = state.videoconferencias.filter((videoconferencia) => videoconferencia._id !== action.payload.data._id)
            })
            .addCase(excluirVideoconferencia.rejected, (state, action) => {
                state.loading = false
                state.success = false
                state.error = action.error.message
            })
    }
})

export const { defineWorkingDate } = videoconferenciaSlice.actions;

export const cadastrarVideoconferencia = createAsyncThunk(
    'videoconferencia/cadastrarVideoconferencia',
    async videoconferencia => {
        const response = await axios.post('/api/videoconferencia', videoconferencia)
        return response.data
    }
)

export const editarVideoconferencia = createAsyncThunk(
    'videoconferencia/editarVideoconferencia',
    async ({id, videoconferencia}) => {
        const response = await axios.put(`/api/videoconferencia/${id}`, {videoconferencia})
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

export const fetchVideoconferenciasByDate = createAsyncThunk(
    'videoconferencia/fetchVideoconferenciasByDate',
    async (date) => {
        const response = await axios.get(`/api/videoconferencia?date=${date}`)
        return response.data
    }
)

export const fetchVideoconferencia = createAsyncThunk(
    'videoconferencia/fetchVideoconferencia',
    async (id) => {
        const response = await axios.get(`/api/videoconferencia/${id}`)
        return response.data
    }
)

export const excluirVideoconferencia = createAsyncThunk(
    'videoconferencia/excluirVideoconferencia',
    async (id) => {
        const response = await axios.delete(`/api/videoconferencia/${id}`)
        return response.data
    }
)

export default videoconferenciaSlice.reducer