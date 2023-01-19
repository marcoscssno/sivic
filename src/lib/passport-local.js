import Local from 'passport-local';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const localStrategy = new Local.Strategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        if (!user) {
            done(new Error('Invalid username and password combination'))
        }
        else {
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                done(new Error('Invalid username and password combination'))
            }
            else {
                done(null, user);
            }
        }
    }
    catch (error) {
        console.error(error)
        done(error)
    }
})
