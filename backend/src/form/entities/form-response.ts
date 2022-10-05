import { Question } from './question';
import { Form } from './form';

export interface Answer {
  questionId: Question;
  value: Array<string>;
}

export interface FormResponse {
  formId: Form;
  answers: Array<Answer>;
}
