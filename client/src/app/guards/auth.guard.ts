import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private _accountSvc: AccountService,
    private _toastrSvc: ToastrService,
  ) {

  }

  canActivate(): Observable<boolean> {
    return this._accountSvc.currentUser$.pipe(
      map((user) => {
        if (!!user) {
          return true;
        }

        this._toastrSvc.error('You shall not pass!!');
        return false;
      })
    );
  }
}
