import { CreateFormInput, CreateQuestionInput, CreateFormResponseInput } from './entity-input';
import { FormDTO, UserFormDTO } from './entity-dto';

export interface FormDAO {
  createForm(form: CreateFormInput): Promise<FormDTO>;

  findFormsByParams(query: Record<string, unknown>): Promise<FormDTO[]>;

  findFormBySlug(slug: string): Promise<any>;

  findFormsByUser(userId: string): Promise<any>;
}

export interface QuestionDAO {
  createQuestion(question: CreateQuestionInput[]): Promise<void>;
}

export interface FormResponseDAO {
  createFormResponse(formResponse: CreateFormResponseInput): Promise<void>;
}
