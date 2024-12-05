import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGO_URL } = process.env;

const connectDB = async () => {
  try {
    const options = { serverSelectionTimeoutMS: 30000 }; 
    await mongoose.connect(MONGO_URL, options);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); // Exit process on connection failure
  }
};

export default connectDB;