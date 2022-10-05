import { Answer } from './form-response';

export interface CreateFormInput {
  name: string;
  slug: string;
  userId: string;
}

export interface CreateQuestionInput {
  formId: string;
  caption: string;
  answerType: string;
  options: Array<string>;
}

export interface CreateFormResponseInput {
  formId: string;
  answers: Array<Answer>;
}
