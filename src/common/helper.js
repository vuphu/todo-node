import jwt from 'jsonwebtoken';
import env from './config/env';

const generateJWT = user => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    env.jwtSecretKey,
  );
};

export default {
  generateJWT,
};
