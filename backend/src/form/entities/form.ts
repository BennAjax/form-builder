import { User } from '../../user/entities/User';

export interface Form {
  name: string;
  slug: string;
  user: User;
}
