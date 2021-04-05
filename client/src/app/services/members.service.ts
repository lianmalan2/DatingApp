import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, map, mergeMap, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  protected _memberSubject$ = new BehaviorSubject([]);
  members$: Observable<Member[]> = this._memberSubject$.asObservable();
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();

  constructor(
    protected _apiSvc: BaseApiService,
  ) { }

  getMembers(page?: number, itemsPerPage?: number): Observable<PaginatedResult<Member[]>> {
    let params = new HttpParams();

    if (!!page && !!itemsPerPage) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this._apiSvc.getResponseByRoute<Member[]>('users', params).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        const pagination = response.headers.get('Pagination');
        if (!!pagination) {
          this.paginatedResult.pagination = JSON.parse(pagination);
        }

        return this.paginatedResult;
      })
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
