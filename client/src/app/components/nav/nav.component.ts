import { loginInput } from 'src/app/entities/login';
import { AccountService } from 'src/app/services/account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  model: loginInput = { username: null, password: null };
  loggedIn: boolean;

  constructor(private _accountSvc: AccountService) { }

  login(): void {
    this._accountSvc.login(this.model).subscribe(r => {
      console.log(r);
      this.loggedIn = true;
    });
  }
}
