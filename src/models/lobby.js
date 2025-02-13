import mongoose, { Schema } from 'mongoose';

const LobbySchema = new Schema({
    coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    title: { type: String }
}, { timestamps: true });

export default mongoose.model('Lobby', LobbySchema);
