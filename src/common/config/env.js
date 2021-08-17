require('dotenv').config();

export default {
  mongoUri: process.env.MONGO_URI,
  mongoUriTest: process.env.MONGO_URI_TEST,
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
};
