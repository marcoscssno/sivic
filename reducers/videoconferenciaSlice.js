import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    videoconferencias: []
}

export const videoconferenciaSlice = createSlice({
    name: 'videoconferencia',
    initialState,
    reducers: {
        cadastrar: (state, action) => {
            state.videoconferencias.push(action.payload)
        }
    },
})

export const { cadastrar } = videoconferenciaSlice.actions

export default videoconferenciaSlice.reducer