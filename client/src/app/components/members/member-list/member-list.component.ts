import { Observable } from 'rxjs';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent {
  members$: Observable<Member[]> = this._memberSvc.getMembers();

  constructor(
    private _memberSvc: MembersService,
  ) { }
}
