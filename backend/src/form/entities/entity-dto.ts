import { AnswerType } from './enum-answer-type';
import { Form } from './form';

export interface FormDTO {
  id: string;
  name: string;
  slug: string;
}

export interface QuestionDTO {
  id: string;
  form: Form;
  caption: string;
  answerType: AnswerType;
  options: Array<string>;
}

export interface UserFormDTO {
  formId: string;
  name: string;
  slug: string;
  TotalResponses: number;
  createdAt: Date;
}
