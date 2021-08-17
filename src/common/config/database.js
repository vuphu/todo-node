import mongoose from 'mongoose';
import env from './env';

const ensureInitialized = uri => {
  return mongoose.connect(uri || env.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
};

export default {
  ensureInitialized,
};
