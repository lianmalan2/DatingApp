import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;

  user$: Observable<User> = this._accountSvc.currentUser$;
  member: Member;
  // TODO: Implement member observable in template form
  member$: Observable<Member> = this.user$.pipe(
    mergeMap(user => this._memberSvc.getMember(user.username)),
  );

  formGroup$: Observable<FormGroup> = this.member$.pipe(
    map((member): FormGroup => {
      const group: FormGroup = {} as FormGroup;
      for (const key of Object.keys(member)) {
        group.addControl(key, member[key])
      }

      return group;
    })
  );


  constructor(
    private _accountSvc: AccountService,
    private _memberSvc: MembersService,
    private _toastrSvc: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.member$.pipe(first()).subscribe(m => this.member = m);
  }

  updateMember() {
    // this.member$.pipe(
    //   first(),
    //   tap(member => console.log(member)),
    //   tap(() => this._toastrSvc.success('Profile updated successfully')),
    // ).subscribe(member => this.editForm.reset(member));

    console.log(this.member);
    this._toastrSvc.success('Profile updated successfully');
    this.editForm.reset(this.member);
  }

}
