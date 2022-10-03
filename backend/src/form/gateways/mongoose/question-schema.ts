import { model, Schema, Types } from 'mongoose';
import { Question } from '../../entities/question';

const questionSchema = new Schema<Question>({
  form: { type: Schema.Types.ObjectId, ref: 'Form' },
  caption: { type: String, required: true },
  answerType: { type: Schema.Types.ObjectId, ref: 'AnswerType' },
  options: [String],
});

export const QuestionModel = model<Question>('Question', questionSchema);

export const { ObjectId } = Types;
