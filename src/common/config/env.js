require('dotenv').config();

export default {
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
};
