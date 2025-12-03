import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { Counter } from './models/counter';
import { logger } from './config/logger';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

// Set up environment variables
// Load from .env file or use defaults
const port = process.env.PORT;
const api_url = process.env.API_URL;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/hitcounter';


mongoose.connect(mongoUrl).then(() => {
    logger.info({ mongoUrl }, "Connected to MongoDB");
}).catch(error => {
    logger.error({ err: error }, "MongoDB connection error");
});

app.get('/counter', async (req, res) => {
    try {
        const counter = await Counter.findOneAndUpdate(
            { name: 'hits' },
            { $inc: { count: 1 } },
            { upsert: true, new: true }
        );
        res.json({ number: counter.count });
    } catch (error) {
        logger.error({ err: error }, "Error in counter endpoint");
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    logger.info(`Server running at http://${api_url}:${port}`);
});
