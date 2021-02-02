import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _routerSvc: Router,
    private _toasterSvc: ToastrService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (!!error) {
          switch (error.status) {
            case 400:
              const errors = error.error.errors;
              if (!!errors) {
                const modelStateErrors = [];
                for (const key in errors) {
                  if (!!errors[key]) {
                    modelStateErrors.push(errors[key]);
                  }
                }

                throw modelStateErrors;
              }

              this._toasterSvc.error(error.statusText, error.status)
              break;

            case 401:
              this._toasterSvc.error(error.statusText, error.status)
              break;

            case 404:
              this._routerSvc.navigateByUrl('/not-found');
              break;

            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } }
              this._routerSvc.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this._toasterSvc.error('Something unexpected went wrong');
              console.log(error);

              break;
          }
        }

        return throwError(error);
      }),
    );
  }
}
