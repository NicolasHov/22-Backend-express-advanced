import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import lobbyRoutes from './routes/lobby.js';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js';
import userRoutes from './routes/user.js';
import { errorHandler } from './middleware/errorHandler.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const API_URL = `http://localhost:${port}/api/`;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'lokkeroom API',
            version: '1.0.0',
            description:
                'This is a REST API application taht manage a chat application made with Express. It retrieves data from MongoDB.',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
            contact: {
                name: 'Nicolas Hovart',
                email: '',
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

app.use(
    cors({
        origin: API_URL,
        credentials: true,
        methods: "GET, POST, PUT, PATCH, DELETE",
        allowedHeaders: "Content-Type, Authorization",
    })
); // Enable CORS
app.use(express.json());

// api-docs swaggerUI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat_app')
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.get('/', (req, res) => {
    res.send('Welcome')
})
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lobbies', lobbyRoutes);
app.use('/api/messages', messageRoutes);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
