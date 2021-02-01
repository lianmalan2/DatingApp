import { Observable } from 'rxjs';
import { AppUser } from 'src/app/entities/user';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Input() users$: Observable<AppUser[]>;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  register() {
    console.log(this.model);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
