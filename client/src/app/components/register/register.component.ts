import { AccountService } from 'src/app/services';
import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Output() cancelRegister = new EventEmitter();

  model: any = {};
  registerForm: FormGroup;

  constructor(
    private _accountSvc: AccountService,
    protected _fb: FormBuilder,
  ) {
    this.initializeForm();
  }

  protected initializeForm() {
    this.registerForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    })

    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  protected matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control?.parent?.controls[matchTo]?.value ? null : { isMatching: true };
    };
  }

  register(): void {
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
