import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  constructor(
    private _apiSvc: BaseApiService,
  ) { }

  getMembers(): Observable<Member[]> {
    return this._apiSvc.getByRoute<Member[]>('users');
  }

  getMember(username: string) {
    return this._apiSvc.getByRoute<Member>(`users/${username}`)
  }
}
