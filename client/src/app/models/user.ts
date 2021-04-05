export type Gender = 'male' | 'female';

export interface AppUser {
  id: number;
  userName: string;
}

export interface User {
  username: string;
  token: any;
  photoUrl: string;
  knownAs: string;
  gender: Gender;
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
