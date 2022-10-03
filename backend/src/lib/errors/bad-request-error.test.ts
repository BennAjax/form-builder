import httpStatus from 'http-status';
import BadRequestError from './bad-request-error';

describe('BadRequestError', () => {
  test('should return error', () => {
    const testError = new BadRequestError('Test Error');
    expect(testError.message).toBe('Test Error');
    expect(testError.status).toBe(httpStatus.BAD_REQUEST);
  });
});
