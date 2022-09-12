import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    createdAt: Date
    
})

export default mongoose.models.User || mongoose.model('User', userSchema)