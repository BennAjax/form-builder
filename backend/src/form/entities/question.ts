import { Form } from './form';
import { AnswerType } from './answer-type';

export interface Question {
  form: Form;
  caption: string;
  answerType: AnswerType;
  options: Array<string>;
}
