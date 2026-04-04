import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongoUri = process.env.NODE_ENV === 'development' 
            ? process.env.MONGO_URI_LOCAL 
            : process.env.MONGO_URI_Server;
        
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};