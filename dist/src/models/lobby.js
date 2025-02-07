import mongoose, { Schema } from 'mongoose';
const LobbySchema = new Schema({
    coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
export default mongoose.model('Lobby', LobbySchema);
