/**
 * Por Marcos Cassiano em 13 de fevereiro de 2022
 * Exemplo de Model para teste
*/

import mongoose from 'mongoose';

const { Schema } = mongoose;

const videoconferenciaSchema = new Schema({
    data_e_hora: Date,
    solicitante: String,
    sala: String,
    link: String,
    excluida: {
        type: Boolean,
        default: false
    },
})

export default mongoose.models.Videoconferencia || mongoose.model('Videoconferencia', videoconferenciaSchema)