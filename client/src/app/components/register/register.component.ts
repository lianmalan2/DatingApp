import { AccountService } from 'src/app/services';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
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
