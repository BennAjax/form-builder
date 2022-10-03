import { ObjectId } from 'mongoose';

interface Answer {
  questionId: ObjectId;
  value: Array<string>;
}

export interface FormResponse {
  formId: ObjectId;
  answer: Array<Answer>;
}
