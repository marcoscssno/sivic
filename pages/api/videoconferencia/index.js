import dbConnect from '../../../utils/dbConnect'
import Videoconferencia from '../../../models/Videoconferencia'
import moment from 'moment'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      const { date } = req.query
      try {
        if (date) {
          if (date !== null && date !== 'null') { // Date is set
            const beginDate = moment(date).format("YYYY-MM-DD")
            const endDate = moment(date).add(1, "days").format("YYYY-MM-DD")
            const videoconferencias = await Videoconferencia.find({ "excluida": false, "data_e_hora": { $gte: beginDate, $lt: endDate } }).sort('data_e_hora sala presos.nome');
            return res.status(200).json({ success: true, data: videoconferencias })
          }
          else {
            const beginDate = moment().format("YYYY-MM-DD")
            const endDate = moment().add(1, "days").format("YYYY-MM-DD")
            const videoconferencias = await Videoconferencia.find({ "excluida": false, "data_e_hora": { $gte: beginDate, $lt: endDate } }).sort('data_e_hora sala presos.nome');
            return res.status(200).json({ success: true, data: videoconferencias })
          }
        }
        else {
          const beginDate = moment().format("YYYY-MM-DD")
          const endDate = moment().add(1, "days").format("YYYY-MM-DD")
          const videoconferencias = await Videoconferencia.find({ "excluida": false, "data_e_hora": { $gte: beginDate, $lt: endDate } }).sort('data_e_hora sala presos.nome');
          return res.status(200).json({ success: true, data: videoconferencias })
        }
      } catch (error) {
        res.status(400).json({ success: false, error })
      }
      break
    case 'POST':
      try {
        const videoconferencia = await Videoconferencia.create(req.body)
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