import supertest from 'supertest';
import httpStatus from 'http-status';
import app from '../index';

describe('Route: Health Check', () => {
  const request = supertest(app);

  describe('Health', () => {
    test('should return 200 for health', async () => {
      const res = await request.get('/health').expect(httpStatus.OK);

      expect(res.body).toBeTruthy();
      expect(res.body.status).toBe('OK');
    });
  });
});
