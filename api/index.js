import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
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
let API_URL = ""

if (process.env.NODE_ENV === "development") API_URL = `http://localhost:${port}/api/`

console.log(API_URL);

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

app.use(
    cors({
        origin: API_URL,
        // optionsSuccessStatus: 200,
        credentials: true,
        methods: "GET, POST, PUT, PATCH, DELETE",
        allowedHeaders: "Content-Type, Authorization",
    })
); // Enable CORS

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
app.use('/api/messages', messageRoutes);

// app.all('*', (req, res) => {
//     res.status(404);
//     if (req.accepts('html')) {
//         res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } else if (req.accepts('json')) {
//         res.json({ "error": "404 Not Found" });
//     } else {
//         res.type('txt').send("404 Not Found");
//     }
// });

if (process.env.NODE_ENV == 'development')
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

export default app