import { Schema, model, Types } from 'mongoose';
import { User } from '../../entities/user';

const userSchema = new Schema<User>(
  {
    email: { type: String, index: true, unique: true, lowercase: true, trim: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);

export const { ObjectId } = Types;
