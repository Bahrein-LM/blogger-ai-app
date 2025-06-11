import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'bloggerai',
            serverSelectionTimeoutMS: 40000,
            connectTimeoutMS: 40000,
        })

        console.log('Database connected successfully');
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);

        // process.on('uncaughtException', (err) => {
        //     console.error('Uncaught Exception:', err);
        // });

        // process.on('unhandledRejection', (err) => {
        //     console.log('Unhandled rejection:', err);
        // });
    }
}

export default connectDB;