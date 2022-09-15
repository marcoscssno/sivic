import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            const { id } = req.query;
            try {
                const user = await User.findById(id);
                res.status(200).json({ success: true, data: user })
            }
            catch (error) {
                console.log(error)
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}