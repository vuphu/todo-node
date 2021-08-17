import UserService from '../services/user';
import helper from '../common/helper';
import util from '../common/util';

const userService = new UserService();

const register = util.catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const { _id: id, username } = user;
  res.send({ id, username });
});

const login = util.catchAsync(async (req, res) => {
  const user = await userService.verifyUser(req.body);
  res.send({ token: helper.generateJWT(user) });
});

export default {
  register,
  login,
};
