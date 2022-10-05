import { UserModel, ObjectId } from './mongoose/user-schema';
import { UserDAO } from '../entities/user-dao';
import { UserDTO } from '../entities/user-dto';
import { CreateUserInput } from '../entities/user-input';

export const _addUserVirtuals = (ds: any): UserDTO => {
  const result = { ...ds._doc, id: ds._id.toString() };
  delete result._id;
  result.__v && delete result.__v;
  return result;
};

export default class UserRepository implements UserDAO {
  private userCollection = UserModel;

  async createUser(user: CreateUserInput): Promise<UserDTO> {
    const newUser = await this.userCollection.create(user);

    return _addUserVirtuals(newUser);
  }

  async findUserByParams(query: Record<string, unknown>): Promise<UserDTO | null> {
    const user = await this.userCollection.findOne({ ...query });

    if (user) return _addUserVirtuals(user);
    return null;
  }
}
