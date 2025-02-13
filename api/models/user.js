import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now() },
}, { timestamps: true });

export default mongoose.model('User', UserSchema);
