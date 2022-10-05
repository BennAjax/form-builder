import { FormModel, ObjectId } from './mongoose/form-schema';
import { FormDAO } from '../entities/entity-dao';
import { FormDTO, UserFormDTO } from '../entities/entity-dto';
import { CreateFormInput } from '../entities/entity-input';

export const _addFormVirtuals = (ds: any): FormDTO => {
  const result = { ...ds._doc, id: ds._id.toString() };
  delete result._id;
  result.__v && delete result.__v;
  return result;
};

export default class FormRepository implements FormDAO {
  private formCollection = FormModel;

  async createForm(form: CreateFormInput): Promise<FormDTO> {
    const newForm = await this.formCollection.create(form);

    return _addFormVirtuals(newForm);
  }

  async findFormsByParams(query: Record<string, unknown>): Promise<FormDTO[]> {
    const forms = await this.formCollection.find({ ...query });

    return forms.map(_addFormVirtuals);
  }

  async findFormBySlug(slug: string): Promise<any> {
    return this.formCollection.aggregate([
      {
        $match: {
          slug,
        },
      },
      {
        $lookup: {
          from: 'questions',
          let: { id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$formId', '$$id'],
                },
              },
            },
          ],
          as: 'questions',
        },
      },
      {
        $project: {
          _id: 0,
          formId: { $toString: '$_id' },
          name: 1,
          questions: 1,
        },
      },
    ]);
  }

  async findFormsByUser(userId: string): Promise<any> {
    return this.formCollection.aggregate([
      {
        $match: {
          userId: new ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: 'form-responses',
          let: { id: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$formId', '$$id'],
                },
              },
            },
          ],
          as: 'responses',
        },
      },
      {
        $project: {
          _id: 0,
          formId: { $toString: '$_id' },
          name: 1,
          slug: 1,
          createdAt: 1,
          totalResponses: { $size: '$responses' },
        },
      },
    ]);
  }
}
