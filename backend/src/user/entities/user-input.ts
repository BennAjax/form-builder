export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}
