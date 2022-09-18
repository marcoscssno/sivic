import { getLoginSession } from "../../lib/auth"
import dbConnect from "../../utils/dbConnect";
import User from "../../models/User";

export default async function user(req, res) {
    await dbConnect();
  try {
        const session = await getLoginSession(req)
        const user = (session && (await User.findOne({username: session._doc.username}))) ?? null

        res.status(200).json({ user })
    } catch (error) {
        console.error(error)
        res.status(500).end('Authentication token is invalid, please log in')
    }
}
