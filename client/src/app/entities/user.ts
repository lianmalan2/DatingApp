export interface AppUser {
  id: number;
  userName: string;
}

export interface User {
  username: string;
  token: any;
}

export interface loginInput {
  username: string;
  password: string;
}

export interface registerInput {
  username: string;
  password: string;
  confirmPassword: string;
}
