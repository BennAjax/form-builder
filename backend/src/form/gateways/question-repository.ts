import { QuestionDTO } from '../entities/entity-dto';
import { QuestionDAO } from '../entities/entity-dao';
import { QuestionModel } from './mongoose/question-schema';
import { CreateQuestionInput } from '../entities/entity-input';

export const _addQuestionVirtuals = (ds: any): QuestionDTO => {
  const result = { ...ds._doc, id: ds._id.toString() };
  delete result._id;
  result.__v && delete result.__v;
  return result;
};

export default class QuestionRepository implements QuestionDAO {
  private questionCollection = QuestionModel;

  async createQuestion(question: CreateQuestionInput[]): Promise<void> {
    await this.questionCollection.create(question);
  }
}
