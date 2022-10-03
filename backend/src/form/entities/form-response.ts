import { Question } from './question';
import { Form } from './form';

interface Answer {
  question: Question;
  value: Array<string>;
}

export interface FormResponse {
  form: Form;
  answer: Array<Answer>;
}
