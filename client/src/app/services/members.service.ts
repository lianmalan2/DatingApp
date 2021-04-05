import { BehaviorSubject, Observable, of } from 'rxjs';
import { first, map, mergeMap, tap } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';
import { UserParams } from '../models/userParams';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  protected _memberSubject$ = new BehaviorSubject([]);
  members$: Observable<Member[]> = this._memberSubject$.asObservable();

  constructor(
    protected _apiSvc: BaseApiService,
  ) { }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }

  private getPaginatedResult<T>(url: string, params: HttpParams): Observable<PaginatedResult<T>> {
    return this._apiSvc.getResponseByRoute<T>(url, params).pipe(
      map(response => {
        const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
        paginatedResult.result = response.body;

        const pagination = response.headers.get('Pagination');
        if (!!pagination) {
          paginatedResult.pagination = JSON.parse(pagination);
        }

        return paginatedResult;
      })
    );
  }

  getMembers(userParams: UserParams): Observable<PaginatedResult<Member[]>> {
    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender.toString());

    return this.getPaginatedResult<Member[]>('users', params);
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
