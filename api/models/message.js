import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lobbyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lobby', required: true },
    content: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Message', MessageSchema);
