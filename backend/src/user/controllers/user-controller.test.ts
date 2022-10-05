/**
 * @jest-environment ./src/__tests__/mongodb-environment.ts
 */
import supertest from 'supertest';
import httpStatus from 'http-status';
import _ from 'lodash';
import app from '../../index';
import { truncateCollection, insertInCollection } from '../../__tests__/helpers/db';
import MockUserProvider from '../__tests__/mocks/mock-user-provider';
import { _generateHash } from '../use-cases/user-service';
import { EMAIL_ALREADY_REGISTERED, INVALID_CREDENTIALS } from '../use-cases/contants';

describe('Controller: Authentication', () => {
  const request = supertest(app);
  const mockUser = MockUserProvider.createOne();
  const createUser = async (user: any) => {
    const input = _.pick(user, ['name', 'email', 'password']);
    input.password = await _generateHash(mockUser.password);
    await insertInCollection('users', [input]);
    return input;
  };

  afterEach(() => {
    truncateCollection('users');
  });

  describe('POST: signup', () => {
    test('should return 400 when validation fails', async () => {
      const res = await request
        .post('/user/signup')
        .send({ name: 'testUser', email: 'test', password: 'test' })
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBe(false);
      expect(res.body.status).toBe('Validation Error');
      expect(res.body.details).toMatchObject([{ path: 'body.email', message: '"email" must be a valid email' }]);
    });

    test('should return 400 when email is already registered', async () => {
      const input = await createUser(mockUser);
      const res = await request.post('/user/signup').send(input).expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBe(false);
      expect(res.body.status).toBe(EMAIL_ALREADY_REGISTERED);
    });

    test('should return 201 when registration is successful ', async () => {
      const input = _.pick(mockUser, ['name', 'email', 'password', 'mobile']);
      const res = await request.post('/user/signup').send(input).expect(httpStatus.CREATED);

      expect(res.body.success).toBe(true);
      expect(res.body.status).toBe('Successful');
    });
  });

  describe('POST: login', () => {
    test('should return 400 when validation fails', async () => {
      const res = await request
        .post('/user/login')
        .send({ email: 'test', password: 'test' })
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBe(false);
      expect(res.body.status).toBe('Validation Error');
    });

    test('should return 400 when credentials are invalid', async () => {
      const input = await createUser(mockUser);

      const res = await request
        .post('/user/login')
        .send({ email: input.email, password: 'test' })
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBe(false);
      expect(res.body.status).toBe(INVALID_CREDENTIALS);
    });

    test('should return 200 with token when credentials are valid', async () => {
      const input = await createUser(mockUser);

      const res = await request
        .post('/user/login')
        .send({ email: input.email, password: mockUser.password })
        .expect(httpStatus.OK);

      expect(res.body.success).toBe(true);
      expect(res.body.token).toBeTruthy();
    });
  });
});
