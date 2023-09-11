import mongoose from 'mongoose';

let isConnected = false; // variable to check if mongoose is connected

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URL) return console.log('MONGODB_URL not found in .env file');

  if (isConnected) return console.log('=> using existing database connection');

  // Make a new connection
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB: ', error);
  }
};
