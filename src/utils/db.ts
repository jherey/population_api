import mongoose from 'mongoose';

export async function connectToDatabase(url: string) {
  try {
    const defaultOptions: mongoose.ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
    };

    return await mongoose.connect(url, defaultOptions);
  } catch (error) {
    throw error;
  }
}