import { model, Schema, Types } from 'mongoose';
import { FormResponse } from '../../entities/form-response';

const formResponseSchema = new Schema<FormResponse>(
  {
    formId: { type: Schema.Types.ObjectId, ref: 'Form' },
    answers: [
      {
        questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
        value: [String],
      },
    ],
  },
  { timestamps: true },
);

export const FormResponseModel = model<FormResponse>('Form-Response', formResponseSchema);

export const { ObjectId } = Types;
