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

  getByRoute<T>(route: string, ...params: any[]) {
    return this._http.get<T>(`${this._baseUrl}${route}`);
  }
}
