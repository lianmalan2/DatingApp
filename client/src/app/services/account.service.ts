import { ToastrService } from 'ngx-toastr';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, first, map, mergeMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser, loginInput, registerInput, User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _currentUserSource = new ReplaySubject<User>(1);
  private _httpRequestOptions$: Observable<{ [header: string]: string | string[] }> = of({});

  currentUser$ = this._currentUserSource.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(
    map((user) => !!user),
  );
  baseUrl = 'https://localhost:5001/api/';

  constructor(
    private _http: HttpClient,
    private _toastrSvc: ToastrService,
  ) {
    this._httpRequestOptions$ = this.currentUser$.pipe(
      map((user) => {
        if (!user) {
          return {};
        }

        const headers = {}
        headers['Authorization'] = `Bearer ${user.token}`;

        return headers;
      }),
    );
  }

  login(model: loginInput): Observable<User> {
    const result = this._http.post(`${this.baseUrl}account/login`, model);
    return result.pipe(
      first(),
      tap((user: User) => {
        if (!!user) {
          localStorage.setItem('user', JSON.stringify(user));
          this._currentUserSource.next(user);
        }
      }),
    )
  }

  register(model: registerInput): Observable<User> {
    const result = this._http.post(`${this.baseUrl}account/register`, model);
    return result.pipe(
      first(),
      tap((user: User) => {
        if (!!user) {
          localStorage.setItem('user', JSON.stringify(user));
          this._currentUserSource.next(user);
        }
      }),
      catchError((err) => {
        console.log(err);
        this._toastrSvc.error(err.error);
        return of(null);
      })
    )
  }

  setCurrentUser(user: User): void {
    this._currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this._currentUserSource.next(null);
  }

  getUsers(): Observable<AppUser[]> {
    return this._httpRequestOptions$.pipe(
      mergeMap((opts) => this._http.get(`${this.baseUrl}users`, { headers: opts }) as Observable<AppUser[]>),
      catchError((err) => {
        console.log(err);
        return of([]);
      }),
    );
  }
}
