import { AccountService } from 'src/app/services/account.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  constructor(private _accountSvc: AccountService) { }

  register() {
    this._accountSvc.register(this.model).subscribe(() => {
      this.cancel();
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
