import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { loginInput, User } from 'src/app/entities/user';
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
  currentUser$: Observable<User>;

  constructor(
    private _accountSvc: AccountService,
    private _routerSvc: Router,
    private _toastrSvc: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loggedIn$ = this._accountSvc.isLoggedIn$;
    this.currentUser$ = this._accountSvc.currentUser$;
  }

  login(): void {
    this._accountSvc.login(this.userLogin).subscribe(() => {
      this._routerSvc.navigateByUrl('/members');
    });
  }

  logout() {
    this._accountSvc.logout();
    this.userLogin = { ...this.initialLogin };
    this._routerSvc.navigateByUrl('/');
  }
}
