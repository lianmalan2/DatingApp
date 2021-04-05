import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent {
  error: any;

  constructor(
    protected _routerSvc: Router,
  ) {
    const navigation = this._routerSvc.getCurrentNavigation();
    this.error = navigation?.extras?.state?.error;
  }

}
