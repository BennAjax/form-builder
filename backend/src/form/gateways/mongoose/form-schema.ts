import { Schema, model, Types } from 'mongoose';
import { Form } from '../../entities/form';

const formSchema = new Schema<Form>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export const FormModel = model<Form>('Form', formSchema);

export const { ObjectId } = Types;
