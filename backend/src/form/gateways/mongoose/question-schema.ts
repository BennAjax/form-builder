import { model, Schema, Types } from 'mongoose';
import { Question } from '../../entities/question';
import { AnswerType } from '../../entities/enum-answer-type';

const questionSchema = new Schema<Question>(
  {
    formId: { type: Schema.Types.ObjectId, ref: 'Form' },
    caption: { type: String, required: true },
    answerType: { type: String, enum: [AnswerType.TEXT, AnswerType.RADIO, AnswerType.CHECKBOX] },
    options: [String],
  },
  { timestamps: true },
);

export const QuestionModel = model<Question>('Question', questionSchema);

export const { ObjectId } = Types;
