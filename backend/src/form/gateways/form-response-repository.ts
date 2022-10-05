import { FormResponseDAO } from '../entities/entity-dao';
import { CreateFormResponseInput } from '../entities/entity-input';
import { FormResponseModel } from './mongoose/form-response-schema';

export default class FormResponseRepository implements FormResponseDAO {
  private formResponseRepository = FormResponseModel;

  async createFormResponse(formResponse: CreateFormResponseInput): Promise<void> {
    await this.formResponseRepository.create(formResponse);
  }
}
