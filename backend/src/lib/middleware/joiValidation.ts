import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { map, pick } from 'lodash';
import BadRequestError from '../errors/bad-request-error';

export const _createValidationError = (error: Joi.ValidationError | Error): BadRequestError => {
  const details =
    'details' in error
      ? map(error.details, ({ path, message }) => ({
          path: path.join('.'),
          message: message.replace(/''/g, "'").replace(/(?=(body)|(params)|(query))\w+./, ''),
        }))
      : [{ message: error.message }];
  // const message = details.map(d => d.message).join(' and ');

  return new BadRequestError('Validation Error', details);
};

interface Schema {
  body?: any;
  params?: any;
  query?: any;
}

export const validate =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (!schema) {
      next();
      return;
    }

    const data = pick(req, ['body', 'params', 'query']);
    const joiSchema = Joi.object(schema);
    const { error, value } = joiSchema.validate(data, { abortEarly: false, allowUnknown: true, stripUnknown: true });

    if (error) {
      const validationErr = _createValidationError(error);
      next(validationErr);
      return;
    }

    Object.keys(value).forEach(key => {
      // @ts-ignore
      req[key] = value[key];
    });

    next();
  };

export const _validateSchema = (obj: unknown, schema: Joi.Schema): void => {
  const { error } = schema.validate(obj, { abortEarly: false, allowUnknown: true });

  if (error) {
    throw _createValidationError(error);
  }
};
