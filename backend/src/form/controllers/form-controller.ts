import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { CreateFormResponseInput, CreateQuestionInput } from '../entities/entity-input';
import * as FormService from '../use-cases/form-service';
import FormRepository from '../gateways/form-repository';
import QuestionRepository from '../gateways/question-repository';
import FormResponseRepository from '../gateways/form-response-repository';

export const getForms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const slug = req.params?.slug as string;
  const userId = req?.user?.id as string;
  const formRepo = new FormRepository();

  slug
    ? FormService.getFormBySlug(formRepo, slug)
        .then(result => res.status(httpStatus.OK).json({ success: true, data: result }))
        .catch(err => next(err))
    : FormService.getFormByUser(formRepo, userId)
        .then(result => res.status(httpStatus.OK).json({ success: true, data: result }))
        .catch(err => next(err));
};

export const createForms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, questions }: { name: string; questions: Omit<CreateQuestionInput, 'formId'>[] } = req.body;
  const formRepo = new FormRepository();
  const questionRepo = new QuestionRepository();
  const userId = req?.user?.id as string;

  FormService.createForms(formRepo, questionRepo, userId, name, questions)
    .then(result => res.status(httpStatus.OK).json({ success: true, data: result }))
    .catch(err => next(err));
};

export const createFormResponse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const input: CreateFormResponseInput = req.body;
  const formResponseRepo = new FormResponseRepository();

  FormService.createFormResponse(formResponseRepo, input)
    .then(() => res.status(httpStatus.OK).json({ success: true }))
    .catch(err => next(err));
};
