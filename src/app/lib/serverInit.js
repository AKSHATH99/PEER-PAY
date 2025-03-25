import connectDB from './dbConnect';

// Initialize database connection when the server starts
if (process.env.NODE_ENV !== 'development') {
  connectDB().catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });
}

// For development, we'll connect on-demand
export const initDB = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error('Failed to connect to database:', error);
    throw error;
  }
}; 