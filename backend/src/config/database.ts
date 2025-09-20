import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/church-dashboard';

        const conn = await mongoose.connect(mongoURI, {
            // Add these options to handle authentication issues
            authSource: 'admin',
            retryWrites: true,
            w: 'majority'
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error);
        console.error('Please check your MongoDB connection string and ensure MongoDB is running without authentication or with proper credentials.');
        process.exit(1);
    }
};

export default connectDB;
