import mongoose from 'mongoose';
import env from './env';

const ensureInitialized = async () => {
  await mongoose.connect(env.mongoUri, { useNewUrlParser: true });
  console.log(`Connect to ${env.mongoUri} successfully.`);
};

export default {
  ensureInitialized,
};
