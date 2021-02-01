import { Observable } from 'rxjs';
import { loginInput } from 'src/app/entities/user';
import { AccountService } from 'src/app/services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  private initialLogin: loginInput = { username: null, password: null };

  userLogin: loginInput = { ...this.initialLogin };
  loggedIn$: Observable<boolean>;

  constructor(
    private _accountSvc: AccountService,
    private _routerSvc: Router
  ) { }

  ngOnInit(): void {
    this.loggedIn$ = this._accountSvc.isLoggedIn$;
  }

  login(): void {
    this._accountSvc.login(this.userLogin).subscribe(() => this._routerSvc.navigateByUrl('/members'));
  }

  logout() {
    this._accountSvc.logout();
    this.userLogin = { ...this.initialLogin };
    this._routerSvc.navigateByUrl('/');
  }
}
