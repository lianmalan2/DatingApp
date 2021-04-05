import { Gender, User } from '../models';

export class UserParams {
  gender: Gender;
  minAge = 18;
  maxAge = 99;
  pageNumber = 1;
  pageSize = 5;

  constructor(user: User) {
    this.gender = user.gender === 'female' ? 'male' : 'female';
  }
}

