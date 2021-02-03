import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
  })
}

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private _baseUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
  ) { }

  getByRoute<T>(route: string, ...params: any[]) {
    return this._http.get<T>(`${this._baseUrl}${route}`, httpOptions);
  }
}
