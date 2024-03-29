import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { Member, User } from 'src/app/models';
import { AccountService, MembersService } from 'src/app/services';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;

  user$: Observable<User> = this._accountSvc.currentUser$;
  member: Member;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    protected _accountSvc: AccountService,
    protected _memberSvc: MembersService,
    protected _toastrSvc: ToastrService,
  ) { }

  ngOnInit(): void {
    this.user$.pipe(
      first(),
      mergeMap(user => this._memberSvc.getMember(user.username)),
      first(),
    ).subscribe(m => this.member = m);
  }

  updateMember() {
    this._memberSvc.updateMember(this.member).subscribe(() => {
      this._toastrSvc.success('Profile updated successfully');
      this.editForm.reset(this.member);
    });
  }
}
