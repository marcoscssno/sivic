import Local from 'passport-local';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const localStrategy = new Local.Strategy(async function (
    username,
    password,
    done
) {
    try {
        const user = await User.findOne({ username });
        const validPassword = await bcrypt.compare(password, user.password);
        if (user && validPassword) {
            done(null, user);
        }
        else {
            console.log('invalid')
            done(new Error('Invalid username and password combination'))
        }
    }
    catch (error) {
        console.error(error)
        done(error)
    }
})
