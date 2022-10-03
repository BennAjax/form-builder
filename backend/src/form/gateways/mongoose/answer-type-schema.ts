import { model, Schema, Types } from 'mongoose';
import { AnswerType } from '../../entities/answer-type';

const answerTypeSchema = new Schema<AnswerType>({
  name: { type: String, required: true },
});

export const AnswerTypeModel = model<AnswerType>('AnswerType', answerTypeSchema);

export const { ObjectId } = Types;
