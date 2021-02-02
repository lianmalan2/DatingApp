import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent {
  baseUrl = 'https://localhost:5001/api/';

  /**
   *
   */
  constructor(private _httpSvc: HttpClient) {

  }


  get404Error() {
    this._httpSvc.get(`${this.baseUrl}buggy/not-found`).pipe(
      tap(response => console.log(response)),
      catchError(err => {
        console.log(err);
        return of(null);
      }),
    ).subscribe();
  }

  get400Error() {
    this._httpSvc.get(`${this.baseUrl}buggy/bad-request`).pipe(
      tap(response => console.log(response)),
      catchError(err => {
        console.log(err);
        return of(null);
      }),
    ).subscribe();
  }

  get500Error() {
    this._httpSvc.get(`${this.baseUrl}buggy/server-error`).pipe(
      tap(response => console.log(response)),
      catchError(err => {
        console.log(err);
        return of(null);
      }),
    ).subscribe();
  }

  get401Error() {
    this._httpSvc.get(`${this.baseUrl}buggy/auth`).pipe(
      tap(response => console.log(response)),
      catchError(err => {
        console.log(err);
        return of(null);
      }),
    ).subscribe();
  }

  get400ValidationError() {
    this._httpSvc.post(`${this.baseUrl}account/register`, {}).pipe(
      tap(response => console.log(response)),
      catchError(err => {
        console.log(err);
        return of(null);
      }),
    ).subscribe();
  }
}
