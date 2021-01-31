import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginInput, loginResponse } from '../entities/login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private _http: HttpClient) { }

  login(model: loginInput): Observable<loginResponse> {
    const result = this._http.post(`${this.baseUrl}account/login`, model) as Observable<loginResponse>;
    return result.pipe(
      first(),
      catchError(err => {
        console.log(err);
        throw err;
      })
    )
  }
}