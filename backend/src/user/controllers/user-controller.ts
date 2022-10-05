import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { CreateUserInput, LoginUserInput } from '../entities/user-input';
import UserRepository from '../gateways/user-repository';
import * as UserService from '../use-cases/user-service';

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user: CreateUserInput = req.body;
  const repo = new UserRepository();

  UserService.signup(repo, user)
    .then(() => res.status(httpStatus.CREATED).json({ success: true, status: 'Successful' }))
    .catch(err => next(err));
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const input: LoginUserInput = req.body;
  const repo = new UserRepository();

  UserService.login(repo, input)
    .then(result => res.status(httpStatus.OK).json({ success: true, ...result }))
    .catch(err => next(err));
};
