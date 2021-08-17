import brcypt from 'bcrypt';
import UserRepository from '../repositories/user';
import constant from '../common/constant';

export default class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(body) {
    const { username, password } = body;

    const isExist = await this.userRepository.exist({ username });
    if (isExist) {
      throw constant.errors.authenticate.user_already_exist;
    }

    const hashedPassword = await brcypt.hash(password, 10);
    return this.userRepository.create({
      username,
      password: hashedPassword,
    });
  }

  async verifyUser(body) {
    const { username, password } = body;

    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw constant.errors.authenticate.user_not_found;
    }

    const isMatchPassword = await brcypt.compare(password, user.password);
    if (!isMatchPassword) {
      throw constant.error.authenticate.incorrect_password;
    }

    return user;
  }

  async getUserById(id) {
    return this.userRepository.findById(id);
  }
}
