import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  model: any = {};

  register() {
    console.log(this.model);
  }

  cancel() {
    console.log('cancelled');
  }
}
