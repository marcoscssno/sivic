import mongoose, { ObjectId } from 'mongoose';

const { Schema } = mongoose;

const videoconferenciaSchema = new Schema({
    data_e_hora: Date,
    ano: Number,
    mes: Number,
    dia: Number,
    hora: Number,
    minuto: Number,
    duracao: {
        type: Number,
        default: 60
    },
    solicitante: String,
    sala: String,
    presos: [{
        nome: String,
        ala: String,
        cela: String,
        periculosidade: String
    }],
    link: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: ObjectId,
    lastUpdatedAt: {
        type: Date,
        default: Date.now
    },
    lastUpdatedBy: ObjectId,
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