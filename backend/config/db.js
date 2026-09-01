import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/civora');
    console.log(`[MongoDB] Connected to database: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // If MongoDB local service is not running, app should not immediately crash during dev testing
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
