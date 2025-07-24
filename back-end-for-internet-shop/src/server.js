import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { dbConnect } from './db.js';

import productsRouter from '../routes/api/products.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, '../public')));


app.use('/api/products', productsRouter);

await dbConnect();
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});