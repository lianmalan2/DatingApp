import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { appUser, User } from './entities/user';
import { AccountService } from './services/account.service';

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
    private _accountSvc: AccountService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.setCurrentUser();
  }

  private getUsers(): void {
    this.users$ = this._http.get('https://localhost:5001/api/users').pipe(
      catchError(err => {
        console.log(err);
        return [];
      }),
    );
  }

  private setCurrentUser(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this._accountSvc.setCurrentUser(user);
  }
}
