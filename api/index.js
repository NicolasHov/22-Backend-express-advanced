import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import lobbyRoutes from './routes/lobby.js';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js';
import userRoutes from './routes/user.js';
import { errorHandler } from './middleware/errorHandler.js';

// import swaggerUi from 'swagger-ui-express';
// import swaggerJsdoc from 'swagger-jsdoc';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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
                email: 'hovart.nicolas@gmail.com',
            },
        },
    },
    apis: ['./api/routes/*.js'],
};

// const specs = swaggerJsdoc(options);

const corsOptions = {
    origin: ['http://127.0.0.1:5173', 'https://backend-lokkeroom.vercel.app'],
    credentials: true,
    methods: "GET, POST, PUT, PATCH, DELETE",
    allowedHeaders: "Content-Type, Authorization",
}

app.use(cors(corsOptions)); // Enable CORS
app.use(helmet())

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// api-docs swaggerUI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s
})
    .then(() => console.log('MongoDB Connected!'))
    .catch(err => console.error('MongoDB Connection Error:', err));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome on lokkeroom' })
})
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome on API' })
})

app.use(errorHandler);


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/lobbies', lobbyRoutes);
app.use('/api/lobbies', messageRoutes);

// Catch-all route
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

if (process.env.NODE_ENV == 'development')
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

export default app
