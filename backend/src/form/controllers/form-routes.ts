import express from 'express';
import * as FormController from './form-controller';
import { verifyToken } from '../../lib/jwt';
import { createForm, createResponse } from './validators';

const router = express.Router();

router.get('/forms', verifyToken, FormController.getForms);
router.get('/forms/:slug?', FormController.getForms);

router.post('/forms', [createForm, verifyToken], FormController.createForms);
router.post('/forms/responses', [createResponse, verifyToken], FormController.createFormResponse);

export default router;
