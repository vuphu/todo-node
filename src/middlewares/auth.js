import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import env from '../common/config/env';
import UserService from '../services/user';

const userService = new UserService();
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: env.jwtSecretKey,
};
const jwtStrategy = new Strategy(jwtOpts, async (payload, done) => {
  try {
    const user = await userService.getUserById(payload.id);
    return done(null, user ? user : false);
  } catch (e) {
    return done(e, false);
  }
});
passport.use(jwtStrategy);

export const jwtHandler = passport.authorize('jwt');
