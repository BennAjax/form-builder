import { ObjectId } from 'mongoose';

export interface CreateFormInput {
  name: string;
  slug: string;
}

export interface CreateQuestionInput {
  formId: ObjectId;
  caption: string;
  answerType: ObjectId;
  options: Array<string>;
}

export interface CreateAnswerTypeInput {
  name: string;
}
