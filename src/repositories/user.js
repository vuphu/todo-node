import User from '../models/user';
import { BaseRepository } from './repository';

export default class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}
