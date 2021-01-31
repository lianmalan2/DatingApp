import { Observable } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { appUser } from './entities/app-user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'The Dating App';
  users$: Observable<appUser>;

  constructor(
    private _http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.users$ = this._http.get('https://localhost:5001/api/users').pipe(
      catchError(err => {
        console.log(err);
        return [];
      }),
    );
  }
}
