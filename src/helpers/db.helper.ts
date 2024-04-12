import mongoose, { ConnectOptions } from 'mongoose';

export default function connectDB() {
    const MONGODB: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/urlShortener';
    mongoose.connect(MONGODB).catch(err => console.error('MongoDB connection error:', err));
    
    const db: mongoose.Connection = mongoose.connection;
    return db;
}