import { CreateFormInput, CreateQuestionInput, CreateAnswerTypeInput } from './entity-input';
import { AnswerTypeDTO, FormDTO } from './entity-dto';

export interface FormDao {
  createForm(form: CreateFormInput): Promise<FormDTO>;

  findFormByParams(query: Record<string, unknown>): Promise<FormDTO | null>;
}

export interface QuestionDao {
  createQuestion(question: CreateQuestionInput[]): Promise<void>;
}

export interface AnswerTypeDao {
  createAnswerType(answerType: CreateAnswerTypeInput): Promise<void>;

  findAll(): Promise<AnswerTypeDTO | null>;
}
