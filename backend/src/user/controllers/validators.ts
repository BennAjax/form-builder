import Joi from 'joi';
import { validate } from '../../lib/middleware/joiValidation';

export const login = validate({
  body: {
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().trim().required().strict(),
  },
});

export const signUp = validate({
  body: {
    name: Joi.string().lowercase().trim().required(),
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().trim().required().strict(),
  },
});
