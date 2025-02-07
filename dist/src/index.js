import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import lobbyRoutes from './routes/lobby.js';
// import messageRoutes from './routes/message.js';
import { errorHandler } from './middleware/errorHandler.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat_app')
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.error('MongoDB Connection Error:', err));
app.use('/auth', authRoutes);
app.use('/lobbies', lobbyRoutes);
// app.use('/messages', messageRoutes);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
