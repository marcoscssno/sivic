import passport from 'passport'
import nextConnect from 'next-connect'
import { localStrategy } from '../../lib/passport-local';
import dbConnect from '../../utils/dbConnect';

const authenticate = (method, req, res) =>
    new Promise((resolve, reject) => {
        passport.authenticate(method, { session: false }, (error, token) => {
            if (error) {
                reject(error)
            } else {
                resolve(token)
            }
        })(req, res)
    })

passport.use(localStrategy)

export default nextConnect()
    .use(passport.initialize())
    .post(async (req, res) => {
        await dbConnect()
        try {
            const user = await authenticate('local', req, res)
            // To do: Register session
            res.status(200).send({ done: true, user })
        } catch (error) {
            console.error(error)
            res.status(401).send(error.message)
        }
    })