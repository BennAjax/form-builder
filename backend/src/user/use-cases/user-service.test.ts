/**
 * @jest-environment ./src/__tests__/mongodb-environment.ts
 */
import _ from 'lodash';
import { _generateHash, signup, login } from './user-service';
import UserRepository from '../gateways/user-repository';
import {
  countDocumentsInCollection,
  insertInCollection,
  truncateCollection,
  findOne,
} from '../../__tests__/helpers/db';
import MockUserProvider from '../__tests__/mocks/mock-user-provider';
import BadRequestError from '../../lib/errors/bad-request-error';
import { EMAIL_ALREADY_REGISTERED, INVALID_CREDENTIALS } from './contants';

describe('Use-Case: Authentication Service', () => {
  let userRepo: UserRepository;

  const mockUser = MockUserProvider.createOne();

  beforeAll(() => {
    userRepo = new UserRepository();
  });

  afterEach(() => {
    truncateCollection('users');
  });

  describe('_generateHash', () => {
    test('should generate hash', async () => {
      const hash = await _generateHash('');
      expect(hash).toBeTruthy();
      expect(hash).toMatch(/^\$2a\$10/);
    });
  });

  describe('signup', () => {
    test('should throw for existing user', async () => {
      await insertInCollection('users', [mockUser]);
      const input = _.pick(mockUser, ['name', 'email', 'password']);

      try {
        await signup(userRepo, input);
      } catch (e: any) {
        expect(e).toBeInstanceOf(BadRequestError);
        expect(e.message).toBe(EMAIL_ALREADY_REGISTERED);
      }
    });

    test('should create user', async () => {
      const input = _.pick(mockUser, ['name', 'email', 'password']);
      await signup(userRepo, input);
      const createdUser: any = await findOne('users', { email: input.email });

      expect(createdUser.email).toBe(input.email);
      expect(createdUser.name).toBe(input.name);
      expect(await countDocumentsInCollection('users')).toEqual(1);
    });
  });

  describe('login', () => {
    test('should throw when email is not found', async () => {
      await insertInCollection('users', [mockUser]);

      try {
        await login(userRepo, { email: 'test@gmail.com', password: 'qwerty' });
      } catch (e: any) {
        expect(e).toBeInstanceOf(BadRequestError);
        expect(e.message).toBe(INVALID_CREDENTIALS);
      }
    });

    test('should throw when password does not match', async () => {
      const input = _.pick(mockUser, ['name', 'email', 'password', 'mobile']);
      input.password = await _generateHash(mockUser.password);
      await insertInCollection('users', [input]);

      try {
        await login(userRepo, { email: input.email, password: 'qwerty' });
      } catch (e: any) {
        expect(e).toBeInstanceOf(BadRequestError);
        expect(e.message).toBe(INVALID_CREDENTIALS);
      }
    });

    test('should return a token', async () => {
      const input = _.pick(mockUser, ['name', 'email', 'password', 'mobile', 'role']);
      input.password = await _generateHash(mockUser.password);

      await insertInCollection('users', [input]);
      const result = await login(userRepo, { email: input.email, password: mockUser.password });

      expect(result.token).toBeTruthy();
    });
  });
});
