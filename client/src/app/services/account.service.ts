import { ToastrService } from 'ngx-toastr';
import { Observable, of, ReplaySubject } from 'rxjs';
import { catchError, first, map, mergeMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser, LoginInput, RegisterInput, User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  protected _currentUserSource = new ReplaySubject<User>(1);
  protected _httpRequestOptions$: Observable<{ [header: string]: string | string[] }> = of({});
  protected _baseUrl = environment.apiUrl;

  currentUser$ = this._currentUserSource.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(
    map((user) => !!user),
  );

  constructor(
    protected _http: HttpClient,
    protected _toastrSvc: ToastrService,
  ) {
    this._httpRequestOptions$ = this.currentUser$.pipe(
      map((user) => {
        if (!user) {
          return {};
        }

        const headers = {};
        headers['Authorization'] = `Bearer ${user.token}`;

        return headers;
      }),
    );
  }

  login(model: LoginInput): Observable<User> {
    const result = this._http.post(`${this._baseUrl}account/login`, model);
    return result.pipe(
      first(),
      tap((user: User) => {
        if (!!user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  register(model: RegisterInput): Observable<User> {
    const result = this._http.post(`${this._baseUrl}account/register`, model);
    return result.pipe(
      first(),
      tap((user: User) => {
        if (!!user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this._currentUserSource.next(user);
  }

  logout(): void {
    localStorage.removeItem('user');
    this._currentUserSource.next(null);
  }

  getUsers(): Observable<AppUser[]> {
    return this._httpRequestOptions$.pipe(
      mergeMap((opts) => this._http.get(`${this._baseUrl}users`, { headers: opts }) as Observable<AppUser[]>),
      catchError((err) => {
        console.log(err);
        return of([]);
      }),
    );
  }
}
