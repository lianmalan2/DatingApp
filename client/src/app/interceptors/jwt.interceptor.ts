import { Observable } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountService } from '../services/account.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    protected _accountSvc: AccountService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this._accountSvc.currentUser$.pipe(
      first(),
      map((user) => {
        if (!user) {
          return request;
        }

        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`
          }
        });
      }),
      mergeMap((newRequest: HttpRequest<unknown>) => next.handle(newRequest)),
    );
  }
}
