import Joi from 'joi';
import { validate } from '../../lib/middleware/joiValidation';

export const createForm = validate({
  body: {
    name: Joi.string().trim().required(),
    questions: Joi.array()
      .items({
        caption: Joi.string().required(),
        answerType: Joi.string().required(),
        options: Joi.array(),
      })
      .required(),
  },
});

export const createResponse = validate({
  body: {
    formId: Joi.string().trim().required(),
    answers: Joi.array()
      .items({
        questionId: Joi.string().required(),
        value: Joi.array().required(),
      })
      .required(),
  },
});
