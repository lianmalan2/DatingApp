import { AccountService } from 'src/app/services';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();

  model: any = {};
  registerForm: FormGroup;

  constructor(private _accountSvc: AccountService) {
    this.initializeForm();
  }

  protected initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl(),
    })
  }

  register(): void {
    console.log(this.registerForm.value);
    //   this._accountSvc.register(this.model).subscribe(user => {
    //     if (!!user) {
    //       this.cancel();
    //     }
    //   });
  }

  cancel(): void {
    this.cancelRegister.emit(false);
  }
}
