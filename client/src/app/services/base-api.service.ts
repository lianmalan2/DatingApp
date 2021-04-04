import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private _baseUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  getByRoute<T>(route: string): Observable<T> {
    return this._http.get<T>(`${this._baseUrl}${route}`).pipe(first());
  }

  putByRoute<T>(route: string, body: any = {}): Observable<T> {
    return this._http.put<T>(`${this._baseUrl}${route}`, body).pipe(first());
  }

  deleteByRoute<T>(route: string): Observable<T> {
    return this._http.delete<T>(`${this._baseUrl}${route}`).pipe(first());
  }
}
