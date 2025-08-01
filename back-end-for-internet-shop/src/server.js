import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { dbConnect } from './db.js';
import products from "../routes/api/products.js";
import userRoutes from "../routes/api/userRoutes.js";
import orderRoutes from "../routes/api/orderRoutes.js";


dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'lax',
        secure: false,
    },
}));
app.use(express.static(path.join(__dirname, '../public/images')));


app.use('/', products);
app.use('/', userRoutes);
app.use('/', orderRoutes);

app.get('/api/auth/me', (req, res) => {
    if (req.session.user) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

await dbConnect();
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});