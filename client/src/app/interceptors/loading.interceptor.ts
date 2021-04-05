import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusyService } from '../services/busy.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(protected busySvc: BusyService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busySvc.busy();
    return next.handle(request).pipe(
      delay(500),
      finalize(() => this.busySvc.idle()),
    );
  }
}
