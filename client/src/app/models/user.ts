export interface AppUser {
  id: number;
  userName: string;
}

export interface User {
  username: string;
  token: any;
  photoUrl: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  password: string;
  confirmPassword: string;
}
