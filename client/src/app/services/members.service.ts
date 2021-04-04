import { BehaviorSubject, noop, Observable, of } from 'rxjs';
import { first, map, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private _memberSubject$ = new BehaviorSubject([]);
  members$: Observable<Member[]> = this._memberSubject$.asObservable();

  constructor(
    private _apiSvc: BaseApiService,
  ) { }

  getMembers(): Observable<Member[]> {
    return this.members$.pipe(
      first(),
      mergeMap((members) => {
        if (members.length > 0) {
          return of(members).pipe(map(m => ({ updateProp: false, members: m })));
        }

        return this._apiSvc.getByRoute<Member[]>('users').pipe(map(m => ({ updateProp: true, members: m })));;
      }),
      tap(({ updateProp, members }) => updateProp ? this._memberSubject$.next(members) : noop),
      map(({ members }) => members),
    );
  }

  getMember(username: string): Observable<Member> {
    return this.members$.pipe(
      first(),
      mergeMap((members) => {
        const member = members.find(m => m.username === username);
        if (!!member) {
          return of(member);
        }

        return this._apiSvc.getByRoute<Member>(`users/${username}`);
      }),
    );
  }

  updateMember(member: Member): Observable<any> {
    return this._apiSvc.putByRoute('users', member).pipe(
      mergeMap(() => this.members$),
      first(),
      tap(members => {
        const index = members.indexOf(member);
        members[index] = member;

        this._memberSubject$.next(members);
      }),
    );
  }

  setMainPhoto(photoId: number): Observable<any> {
    return this._apiSvc.putByRoute(`users/set-main-photo/${photoId}`);
  }

  deletePhoto(photoId: number): Observable<any> {
    return this._apiSvc.deleteByRoute(`users/delete-photo/${photoId}`);
  }
}
