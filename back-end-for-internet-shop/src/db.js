import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_CONNECTION = process.env.MONGO_CONNECTION;
const client = new MongoClient(MONGO_CONNECTION);

export let db;

export async function dbConnect() {
    if (!db) {
        await client.connect();
        db = client.db('sample_mflix');
        console.log('Connected to MongoDB');
    }
    return db;
}