import { UserDTO } from './user-dto';
import { CreateUserInput } from './user-input';

export interface UserDAO {
  createUser(user: CreateUserInput): Promise<UserDTO>;

  findUserByParams(query: Record<string, unknown>): Promise<UserDTO | null>;
}
