import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if we already have a connection
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    }

    // If no connection exists, create a new one
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    if (error.message.includes('bad auth')) {
      console.error('Authentication failed. Please check your MongoDB credentials and database name in the MONGODB_URI.');
    }
    throw error;
  }
};

export default connectDB;