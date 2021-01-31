import { Observable, ReplaySubject } from 'rxjs';
import { catchError, first, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInput } from '../entities/login';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _currentUserSource = new ReplaySubject<User>(1);

  currentUser$ = this._currentUserSource.asObservable();
  isLoggedIn$ = this.currentUser$.pipe(
    map((user) => !!user),
  );
  baseUrl = 'https://localhost:5001/api/';

  constructor(private _http: HttpClient) { }

  login(model: loginInput): Observable<User> {
    const result = this._http.post(`${this.baseUrl}account/login`, model) as Observable<User>;
    return result.pipe(
      first(),
      tap((user) => {
        if (!!user) {
          localStorage.setItem('user', JSON.stringify(user));
          this._currentUserSource.next(user);
        }
      }),
      catchError((err) => {
        console.log(err);
        throw err;
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
}
