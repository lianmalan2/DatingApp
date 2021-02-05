import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { first, mergeMap } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';
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
    private _accountSvc: AccountService,
    private _memberSvc: MembersService,
    private _toastrSvc: ToastrService,
  ) { }

  ngOnInit(): void {
    this.user$.pipe(
      first(),
      mergeMap(user => this._memberSvc.getMember(user.username)),
      first(),
    ).subscribe(m => this.member = m);
  }

  updateMember() {
    console.log(this.member);
    this._toastrSvc.success('Profile updated successfully');
    this.editForm.reset(this.member);
  }
}
