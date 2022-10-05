/**
 * @jest-environment ./src/__tests__/mongodb-environment.ts
 */
import _ from 'lodash';
import MockUserProvider from '../__tests__/mocks/mock-user-provider';
import { countDocumentsInCollection, truncateCollection, insertInCollection } from '../../__tests__/helpers/db';
import UserRepository, { _addUserVirtuals } from './user-repository';

describe('Gateway: User Repository', () => {
  let userRepo: UserRepository;

  const mockUser = MockUserProvider.createOne();

  beforeAll(() => {
    userRepo = new UserRepository();
  });

  afterEach(() => {
    truncateCollection('users');
  });

  describe('_addUserVirtuals', () => {
    test('should return UserDTO object', async () => {
      const result = _addUserVirtuals(mockUser);

      // @ts-ignore
      expect(result._id).toBeFalsy();
      expect(typeof result.id).toBe('string');
    });
  });

  describe('createUser', () => {
    test('should insert a user', async () => {
      const input = _.pick(mockUser, ['name', 'email', 'password']);
      const user = await userRepo.createUser(input);

      expect(user.id).toBeTruthy();
      expect(user.name).toBe(input.name);
      expect(await countDocumentsInCollection('users')).toEqual(1);
    });
  });

  describe('findUserByParams', () => {
    test('should find user by email', async () => {
      await insertInCollection('users', [mockUser]);
      const user = await userRepo.findUserByParams({ email: mockUser.email });

      expect(user?.email).toBe(mockUser.email);
      expect(user?.id).toBe(mockUser._id.toString());
      expect(user?.name).toBe(mockUser.name);
    });

    test('should return no user', async () => {
      const user = await userRepo.findUserByParams({ mobile: mockUser.mobile });

      expect(user).toBeNull();
    });
  });
});
