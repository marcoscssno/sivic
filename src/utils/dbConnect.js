import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

/**  
 * Note by Marcos Cassiano on February 2nd, 2022:
 * The options below are no longer supported on Mongoose 6 mongoose.connect()
 * 
 * bufferMaxEntries: 0,
 * useFindAndModify: false,
 * useCreateIndex: true,
 * useNewUrlParser: true,
 * useUnifiedTopology: true
 * 
*/

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: true
        }

        try {
            cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
                return mongoose
            })
        }
        catch(error) {
            throw new Error(error.message)
        }
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default dbConnect
