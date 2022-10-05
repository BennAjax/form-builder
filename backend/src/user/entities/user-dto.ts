export interface UserDTO {
  id: string;
  email: string;
  password: string;
  name: string;
}

export interface LoginDTO {
  token: string;
}
