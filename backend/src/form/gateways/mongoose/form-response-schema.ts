import { model, Schema, Types } from 'mongoose';
import { FormResponse } from '../../entities/form-response';

const formResponseSchema = new Schema<FormResponse>({
  form: { type: Schema.Types.ObjectId, ref: 'Form' },
  answer: [
    {
      question: { type: Schema.Types.ObjectId, ref: 'Question' },
      value: [String],
    },
  ],
});

export const FormResponseModel = model<FormResponse>('Form', formResponseSchema);

export const { ObjectId } = Types;
