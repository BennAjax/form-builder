import httpStatus from 'http-status';
import APIError from './api-error';

export default class BadRequestError extends APIError {
  constructor(message: string, meta?: any) {
    super(message, httpStatus.BAD_REQUEST, meta);
  }
}
