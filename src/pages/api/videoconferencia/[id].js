import dbConnect from '../../../utils/dbConnect'
import Videoconferencia from '../../../models/Videoconferencia'

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const { id } = req.query
                const videoconferencia = await Videoconferencia.findOne({ "_id": id, "excluida": false })
                res.status(200).json({ success: true, data: videoconferencia })
            } catch (error) {
                res.status(400).json({ success: false, error })
            }
            break
        case 'PUT':
            try {
                const videoconferencia = await Videoconferencia.findOneAndUpdate({ "_id": req.query.id, "excluida": false }, req.body.videoconferencia)
                res.status(200).json({ success: true, data: videoconferencia })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, error: error })
            }
            break
        case 'DELETE':
            try {
                const videoconferencia = await Videoconferencia.findOneAndUpdate({ "_id": req.query.id, "excluida": false }, { "excluida": true, "data_exclusao": new Date() })
                res.status(200).json({ success: true, data: videoconferencia })
            } catch (error) {
                console.log(error)
                res.status(400).json({ success: false, error: error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}