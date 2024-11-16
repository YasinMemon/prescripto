import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONOGODB_URI}/prescripto`);

        mongoose.connection.on('connected', () => {
            console.log('MongoDB Connected');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Optionally exit if connection fails
    }
};

export default connectDB;
