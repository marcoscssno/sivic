import dbConnect from '../../../utils/dbConnect';
import User from '../../../models/User';
import moment from 'moment';
import bcrypt from 'bcrypt';

const saltRounds = 12;

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const users = await User.find({});
                res.status(200).json({ success: true, data: users })
            }
            catch (error) {
                console.log(error)
            }
            break
        case 'POST':
            try {
                const userData = {
                    username: req.body.username,
                    password: req.body.password,
                    createdAt: moment().format()
                }
                const salt = await bcrypt.genSalt(saltRounds);
                const hash = await bcrypt.hash(userData.password, salt);
                userData.password = hash;
                const user = await User.create(userData)
                res.status(200).json({ success: true, data: user })
            } catch (error) {
                res.status(400).json({ success: false, error: error })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}