import { Component, OnInit } from '@angular/core';
import { User } from './entities/user';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _accountSvc: AccountService,
  ) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  private setCurrentUser(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this._accountSvc.setCurrentUser(user);
  }
}
