import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.scss']
})
export class TestErrorsComponent {
  baseUrl = 'https://localhost:5001/api/';
  validationErrors: string[] = [];

  constructor(
    private _httpSvc: HttpClient,
  ) { }

  get404Error(): void {
    this._httpSvc.get(`${this.baseUrl}buggy/not-found`).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get400Error(): void {
    this._httpSvc.get(`${this.baseUrl}buggy/bad-request`).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get500Error(): void {
    this._httpSvc.get(`${this.baseUrl}buggy/server-error`).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get401Error(): void {
    this._httpSvc.get(`${this.baseUrl}buggy/auth`).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  get400ValidationError(): void {
    this._httpSvc.post(`${this.baseUrl}account/register`, {}).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.validationErrors = error;
    });
  }
}
