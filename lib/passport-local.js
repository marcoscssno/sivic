import Local from 'passport-local';
import User from '../models/User';
import bcrypt from 'bcrypt';

export const localStrategy = new Local.Strategy(async function (
    username,
    password,
    done
) {
    try {
        const user = await User.find({ username });
        if(user) {
            if(bcrypt.compare(password, user.password)) {
                done(null, user);
            }
        }
        else {
            done(new Error('Invalid username and password combination'))
        }
    }
    catch (error) {
        done(error)
    }
})
