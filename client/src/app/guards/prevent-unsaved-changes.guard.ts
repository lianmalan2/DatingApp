import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../components/members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: MemberEditComponent,
  ): Observable<boolean> {
    return component.formGroup$.pipe(
      filter(group => !!group),
      map(group => group.dirty ? confirm('Are you sure you want to continue? Any unsaved changes will be lost') : true),
    );
  }
}
