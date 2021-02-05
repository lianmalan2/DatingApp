import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.scss']
})
export class MemberEditComponent implements OnInit {
  user$: Observable<User> = this._accountSvc.currentUser$;;
  member$: Observable<Member> = this.user$.pipe(
    mergeMap(user => this._memberSvc.getMember(user.username)),
  );


  constructor(
    private _accountSvc: AccountService,
    private _memberSvc: MembersService,
  ) {

  }

  ngOnInit(): void {
  }

}
