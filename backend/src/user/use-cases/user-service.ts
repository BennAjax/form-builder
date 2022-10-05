import bcrypt from 'bcryptjs';
import { UserDAO } from '../entities/user-dao';
import { LoginDTO } from '../entities/user-dto';
import { CreateUserInput, LoginUserInput } from '../entities/user-input';
import BadRequestError from '../../lib/errors/bad-request-error';
import InternalError from '../../lib/errors/internal-error';
import { EMAIL_ALREADY_REGISTERED, CREATE_USER_ERROR, INVALID_CREDENTIALS } from './contants';
import { createToken } from '../../lib/jwt';

export const _generateHash = async (password: string): Promise<string> => {
  try {
    const SALT_WORK_FACTOR = 10;
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    return bcrypt.hash(password, salt);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const signup = async (repo: UserDAO, userObject: CreateUserInput): Promise<void> => {
  const { name, email, password } = userObject;
  const user = await repo.findUserByParams({ email });
  if (user) throw new BadRequestError(EMAIL_ALREADY_REGISTERED);

  const passwordHash = await _generateHash(password);

  try {
    await repo.createUser({ name, email, password: passwordHash });
  } catch (e: any) {
    throw new InternalError(CREATE_USER_ERROR);
  }
};

export const login = async (repo: UserDAO, input: LoginUserInput): Promise<LoginDTO> => {
  const user = await repo.findUserByParams({ email: input.email });
  if (!user) throw new BadRequestError(INVALID_CREDENTIALS);

  const passwordMatch = await bcrypt.compare(input.password, user.password);
  if (!passwordMatch) throw new BadRequestError(INVALID_CREDENTIALS);

  const token = createToken(user.id, user.email, user.name);

  return {
    token,
  };
};
