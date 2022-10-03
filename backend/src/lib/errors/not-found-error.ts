import httpStatus from 'http-status';
import APIError from './api-error';

export default class NotFoundError extends APIError {
  constructor(message: string) {
    super(message, httpStatus.NOT_FOUND);
  }
}
