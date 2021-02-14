import { AccountService } from 'src/app/services';
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

  register(): void {
    this._accountSvc.register(this.model).subscribe(user => {
      if (!!user) {
        this.cancel();
      }
    });
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }
}
