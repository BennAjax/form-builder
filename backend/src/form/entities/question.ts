import { Form } from './form';
import { AnswerType } from './enum-answer-type';

export interface Question {
  formId: Form;
  caption: string;
  answerType: AnswerType;
  options: Array<string>;
}
