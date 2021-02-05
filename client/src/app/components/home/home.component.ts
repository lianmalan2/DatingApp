
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  registerMode = false;

  registerToggle(): void {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event: boolean): void {
    this.registerMode = event;
  }
}
