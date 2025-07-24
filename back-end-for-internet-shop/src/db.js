import mongoose from 'mongoose';

export async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(' Connected to MongoDB via Mongoose');
    } catch (err) {
        console.error(' MongoDB connection error:', err);
        process.exit(1);
    }
}