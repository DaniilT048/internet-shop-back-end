import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import {dbConnect} from "./db.js";
import {getAllProductsWithCursor, getProductById} from "../services/productsServices.js";

const PORT = 4000;
const app = express();

async function startServer() {
    try {
        await dbConnect();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(cors({
    origin: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.json());


app.get('/products', async (req, res) => {
    try {
        const { category, sort } = req.query;
        const products = await getAllProductsWithCursor(category, sort);
        res.render('products', { products, category, sort });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error when receiving products');
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) return res.status(404).send('Products not found');
        res.render('product', { product });
    } catch (err) {
        console.error('Error when receiving articles', err);
        res.status(500).send('Error server');
    }
});



startServer();
