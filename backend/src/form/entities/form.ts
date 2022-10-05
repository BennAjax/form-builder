import { User } from '../../user/entities/user';

export interface Form {
  name: string;
  slug: string;
  userId: User;
}
