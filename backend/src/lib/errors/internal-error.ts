import httpStatus from 'http-status';
import APIError from './api-error';

export default class InternalError extends APIError {
  constructor(message: string) {
    super(message, httpStatus.INTERNAL_SERVER_ERROR);
  }
}
