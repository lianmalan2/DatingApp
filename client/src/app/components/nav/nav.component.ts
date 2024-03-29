import { Observable } from 'rxjs';
import { LoginInput, User } from 'src/app/models';
import { AccountService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  protected initialLogin: LoginInput = { username: null, password: null };

  userLogin: LoginInput = { ...this.initialLogin };
  loggedIn$: Observable<boolean>;
  currentUser$: Observable<User>;

  constructor(
    protected _accountSvc: AccountService,
    protected _routerSvc: Router,
  ) { }

  ngOnInit(): void {
    this.loggedIn$ = this._accountSvc.isLoggedIn$;
    this.currentUser$ = this._accountSvc.currentUser$;
  }

  login(): void {
    this._accountSvc.login(this.userLogin).subscribe((response) => {
      if (!!response) {
        this._routerSvc.navigateByUrl('/members');
      }
    });
  }

  logout(): void {
    this._accountSvc.logout();
    this.userLogin = { ...this.initialLogin };
    this._routerSvc.navigateByUrl('/');
  }
}
