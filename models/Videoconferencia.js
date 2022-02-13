/**
 * Por Marcos Cassiano em 13 de fevereiro de 2022
 * Exemplo de Model para teste
*/

import mongoose from 'mongoose';

const { Schema } = mongoose;

const videoconferenciaSchema = new Schema({
    solicitante: String,
})

const Videoconferencia = mongoose.model('Videoconferencia', videoconferenciaSchema)

export default Videoconferencia