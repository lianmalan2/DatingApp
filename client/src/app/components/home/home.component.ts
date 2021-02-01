import { Observable } from 'rxjs';
import { AppUser } from 'src/app/entities/user';
import { AccountService } from 'src/app/services/account.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users$: Observable<AppUser[]>;

  constructor(private _accountSvc: AccountService) { }

  ngOnInit(): void {
    this.users$ = this._accountSvc.getUsers();
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
