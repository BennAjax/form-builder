import uniqueId from 'uniqid';
import { FormDAO, FormResponseDAO, QuestionDAO } from '../entities/entity-dao';
import { CreateFormResponseInput, CreateQuestionInput } from '../entities/entity-input';
import { FormDTO } from '../entities/entity-dto';
import InternalError from '../../lib/errors/internal-error';
import { CREATE_FORM_ERROR, CREATE_FORM_RESPONSE_ERROR } from './constants';

export const createForms = async (
  formRepo: FormDAO,
  questionRepo: QuestionDAO,
  userId: string,
  name: string,
  questions: Omit<CreateQuestionInput, 'formId'>[],
): Promise<FormDTO> => {
  try {
    const slug = uniqueId();
    const form = await formRepo.createForm({ name, slug, userId });

    const questionInput: CreateQuestionInput[] = questions.map(value => ({ formId: form.id, ...value }));
    await questionRepo.createQuestion(questionInput);

    return { id: form.id, name, slug };
  } catch (e) {
    throw new InternalError(CREATE_FORM_ERROR);
  }
};

export const createFormResponse = async (repo: FormResponseDAO, input: CreateFormResponseInput): Promise<void> => {
  try {
    await repo.createFormResponse(input);
  } catch (e) {
    throw new InternalError(CREATE_FORM_RESPONSE_ERROR);
  }
};

export const getFormBySlug = async (repo: FormDAO, slug: string): Promise<any> => {
  return repo.findFormBySlug(slug);
};

export const getFormByUser = async (repo: FormDAO, userId: string): Promise<any> => {
  return repo.findFormsByUser(userId);
};
