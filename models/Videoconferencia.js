import mongoose from 'mongoose';

const { Schema } = mongoose;

const videoconferenciaSchema = new Schema({
    data_e_hora: Date,
    ano: Number,
    mes: Number,
    dia: Number,
    hora: Number,
    minuto: Number,
    solicitante: String,
    sala: String,
    link: String,
    excluida: {
        type: Boolean,
        default: false
    },
    data_exclusao: {
        type: Date,
        default: null
    }
})

export default mongoose.models.Videoconferencia || mongoose.model('Videoconferencia', videoconferenciaSchema)