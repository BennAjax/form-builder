import { ObjectId } from 'mongoose';

export interface Question {
  formId: ObjectId;
  caption: string;
  answerType: ObjectId;
  options: Array<string>;
}
